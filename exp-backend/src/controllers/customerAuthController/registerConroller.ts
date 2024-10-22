import { Request, Response } from "express";
import bcrypt from "bcrypt";
import axios from "axios"; // Import Axios for API requests
import { Customer } from "../../models/Customer";
import { Country } from "../../models/Address"; // Import Country model
import { SALT } from "../../config/env"; // Import pepper for OTP hashing
import { generateOtp, hashOtp, saveOtpToDatabase } from "../../utils/generate/generateOtp"; // OTP related imports
import { Otp } from "../../models/OtpVerification"; // OTP model import
import { randomBytes } from "crypto"; // For token generation
import { sendEmail } from "../../utils/sentEmailGmail/emailService";

export const RegisterCustomer = async (req: Request, res: Response): Promise<Response> => {
  const { firstname, lastname, email, password, acceptedTerms, telephone } = req.body;
  const ip = req.ip; // Fetch the user's IP address

  // Check for missing fields
  if (!firstname || !lastname || !email || !password || typeof acceptedTerms === 'undefined') {
    return res.status(400).json({
      status: "failed",
      message: "First name, last name, email, password, and acceptance of terms are required.",
    });
  }

  // Check if terms were accepted
  if (!acceptedTerms) {
    return res.status(400).json({
      status: "failed",
      message: "You must accept the Terms and Conditions to register.",
    });
  }

  try {
    const existingCustomer = await Customer.findOne({ email }).lean();
    
    if (existingCustomer) {
      if (existingCustomer.authProvider.includes("local")) {
        return res.status(400).json({
          status: "failed",
          message: "Email is already registered with local credentials.",
        });
      }
      if (!existingCustomer.password && password) {
        const hashedPassword = await bcrypt.hash(password, Number(SALT));

        await Customer.updateOne(
          { email },
          {
            $set: {
              password: hashedPassword,
              authProvider: existingCustomer.authProvider.includes("local")
                ? existingCustomer.authProvider
                : [...existingCustomer.authProvider, "local"],
            },
          }
        );
        return res.status(200).json({
          status: "success",
          message: "Account updated with local credentials.",
        });
      }
      return res.status(400).json({
        status: "failed",
        message: "Customer already exists with the given email.",
      });
    }

    // Fetch country information based on IP address
    const locationResponse = await axios.get(`http://ip-api.com/json/${ip}`);
    const locationData = locationResponse.data;

    // Country data from IP address
    const countryData = {
      name: locationData.country,
      isoCode2: locationData.countryCode,
    };

    // Check if country exists in the database
    let country = await Country.findOne({ isoCode2: countryData.isoCode2 }).lean();

    if (!country) {
      // If country doesn't exist, create a new one (optional)
      country = new Country({
        ...countryData,
        addressFormat: "", 
        postalCodeRequired: false,
        status: true,
        currency: "PKR",
        taxRate: 0.0,
        timeZone: "UTC",
        region: "Global",
        shippingEnabled: true,
      });
      await country.save();
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, Number(SALT));

    // Create new customer
    const newCustomer = new Customer({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      telephone: telephone || undefined,
      authProvider: ["local"],
      roles: ["customer"],
      status: true,
      countryId: country._id,
      acceptedTerms, // Save terms acceptance
    });

    // Save the customer in the database
    const savedCustomer = await newCustomer.save();

    // **Generate OTP and Token**
    const otp = generateOtp(); // Random OTP generate karein
    const token = randomBytes(32).toString("hex"); // Random token generate karein

    // **Hash OTP and Token**
    const hashedOtp = await hashOtp(otp, Number(SALT)); // OTP ko hash karein with salt and pepper
    const hashedToken = await bcrypt.hash(token, Number(SALT)); // Token ko hash karein

    // **Save OTP and Token to Database**
    await saveOtpToDatabase(Otp, savedCustomer._id, "Customer", hashedOtp, hashedToken); // OTP ko database mein save karein

    // **Send OTP Email**
    await  sendEmail('otpTemplate', { email, otp, firstname });

    // Return successful response with customer data and OTP instructions
    return res.status(201).json({
      status: "success",
      message: "Customer registered successfully. An OTP has been sent to your email.",
      customer: {
        id: savedCustomer._id,
        firstname: savedCustomer.firstname,
        lastname: savedCustomer.lastname,
        email: savedCustomer.email,
        telephone: savedCustomer.telephone,
        roles: savedCustomer.roles,
        acceptedTerms: savedCustomer.acceptedTerms,
        country: {
          id: country._id,
          name: country.name,
          isoCode2: country.isoCode2,
        },
      },
      otpInstructions: "Please verify the OTP sent to your email."
    });

  } catch (error: any) {
    console.error("Registration error:", error);

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
