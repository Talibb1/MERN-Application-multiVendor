import axios from "axios";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Customer } from "../../models/Customer";
import { SALT, JWT_ACCESS_KEY } from "../../config/env";
import {
  generateOtp,
  hashOtp,
  saveOtpToDatabase,
} from "../../utils/generate/generateOtp";
import { Otp } from "../../models/OtpVerification";
import { sendEmail } from "../../utils/sentEmailGmail/emailService";
import { Types } from "mongoose";
import { sendEmailParams } from "../../types/emailTypes/emailTypes";
import logger from "../../logs/logger";
import { AppError } from "../../middleware/errors";
import { Country } from "../../models/Address";



export const RegisterCustomer = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { firstname, lastname, email, password, acceptedTerms } = req.body;
  const userIp = req.ip;

  // Validate request parameters
  if (
    !firstname ||
    !lastname ||
    !email ||
    !password ||
    typeof acceptedTerms === "undefined"
  ) {
    return res.status(400).json({
      status: "failed",
      message:
        "First name, last name, email, password, and acceptance of terms are required.",
    });
  }

  if (!acceptedTerms) {
    return res.status(400).json({
      status: "failed",
      message: "You must accept the Terms and Conditions to register.",
    });
  }

  try {
    // Check if customer already exists
    const existingCustomer = await Customer.findOne({ email }).lean();

    if (existingCustomer) {
      if (existingCustomer.authProvider.includes("LOCAL")) {
        throw new AppError("Email is already registered with local credentials.", 400);
      }
      if (!existingCustomer.password && password) {
        const hashedPassword = await bcrypt.hash(password, Number(SALT));
        await Customer.updateOne(
          { email },
          {
            $set: {
              password: hashedPassword,
              authProvider: [...existingCustomer.authProvider, "LOCAL"],
            },
          }
        );
        return res.status(200).json({
          status: "success",
          message: "Account updated with local credentials.",
        });
      }
      throw new AppError("Customer already exists with the given email.", 400);
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, Number(SALT));

    // Create new customer
    const newCustomer = new Customer({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      authProvider: ["LOCAL"],
      roles: ["customer"],
      status: true,
      acceptedTerms,
    });

    // Save the customer in the database
    const savedCustomer = await newCustomer.save();

    // IP se country information fetch karo
    const ipApiUrl = `http://ip-api.com/json/103.156.137.117`;
    const response = await axios.get(ipApiUrl);
    const ipData = response.data;
    console.log(ipData)
    if (!ipData || ipData.status !== "success") {
      throw new AppError("Unable to fetch IP information.", 500);
    }
    if (ipData.status === "success") {
      const countryData = new Country({
        name: ipData.country || "Unknown",
        isoCode2: ipData.countryCode || "Unknown", 
        zipCode: ipData.zip || "Unknown",
        city: ipData.city || "Unknown",
        ip: userIp,
        isp: ipData.isp || "Unknown",
        location: ipData.lat && ipData.lon ? `${ipData.lat},${ipData.lon}` : "Unknown",
        organization: ipData.org || "Unknown",
        timeZone: ipData.timezone || "UTC",
        region: ipData.regionName || "Unknown",
      });
      await countryData.save();
    }

    // Generate OTP
    const otp = generateOtp();

    if (!JWT_ACCESS_KEY) {
      throw new AppError("Internal Server Error: JWT secret is not defined.", 500);
    }

    // Generate JWT Token
    const token = jwt.sign(
      { customerId: savedCustomer._id, email: savedCustomer.email },
      JWT_ACCESS_KEY,
      { expiresIn: "15m" }
    );

    // Hash OTP
    const hashedOtp = await hashOtp(otp, Number(SALT));

    // Save OTP to Database
    await saveOtpToDatabase(
      Otp,
      savedCustomer._id as Types.ObjectId,
      "Customer",
      hashedOtp,
      token
    );

    // Send OTP Email
    const emailParams: sendEmailParams = {
      from: "talibuddinqazi@gmail.com",
      to: email,
      customerName: firstname,
      email: email,
      firstname: firstname,
      subject: "Your OTP Code",
      html: "",
      replyTo: "support@example.com",
      otp: otp,
    };

    await sendEmail("otpTemplate", emailParams);

    // Return successful response
    return res.status(201).json({
      status: "success",
      message:
        "Customer registered successfully. An OTP has been sent to your email.",
      customer: {
        id: savedCustomer._id,
        firstname: savedCustomer.firstname,
        lastname: savedCustomer.lastname,
        email: savedCustomer.email,
        roles: savedCustomer.roles,
        acceptedTerms: savedCustomer.acceptedTerms,
        ipAddress: userIp,
      },
      token,
      otpInstructions: "Please verify the OTP sent to your email.",
    });
  } catch (error: any) {
    // Log the error using your logger
    logger.error(error.message || "Registration error", { error });

    // Handle operational errors gracefully
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
      });
    }

    // Handle duplicate email error
    if (error.code === 11000) {
      return res.status(400).json({
        status: "failed",
        message: "Email is already registered.",
      });
    }

    return res.status(500).json({
      status: "failed",
      message: "Server error. Please try again later.",
    });
  }
};