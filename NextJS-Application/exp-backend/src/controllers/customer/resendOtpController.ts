import { Request, Response } from "express";
import bcrypt from "bcrypt";
import Customer, { ICustomer, CustomerRole } from "../../models/customer";
import { SALT } from "../../config/env";
import OtpVerification, { IOtpVerification } from "../../models/otp";
import { generateToken, generateOtp } from "../../utils/helpers"; 

const RegisterCustomer = async (req: Request, res: Response): Promise<Response> => {
  const { firstname, lastname, email, password } = req.body;

 
  if (!firstname || !lastname || !email || !password) {
    return res.status(400).json({
      status: "failed",
      message: "First name, last name, email, and password are required.",
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

    // Hash password
    const hashedPassword = await bcrypt.hash(password, Number(SALT));

    // Create a new customer document
    const newCustomer: ICustomer = new Customer({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      authProvider: ["local"],           // Set local authentication provider
      roles: [CustomerRole.CUSTOMER],    // Assign default role as CUSTOMER
      status: true,                      // Set status to active by default
      token: generateToken(),            // Generate a unique token for the customer
    });

    // Save the new customer to the database
    const savedCustomer = await newCustomer.save();

    // Generate OTP for the customer
    const otpCode = generateOtp(); // Assuming you have a function to generate OTP
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // Set OTP expiry time (e.g., 10 minutes)

    // Create OTP document
    const otpDocument: IOtpVerification = new OtpVerification({
      userId: savedCustomer._id,
      userType: "Customer",  // Assuming enum or user type handling
      otp: otpCode,
      otpExpiry,
      token: savedCustomer.token,  // Associate with the customer’s token
      tokenExpiry: otpExpiry,      // Assuming same expiry as OTP
    });

    // Save the OTP to the database
    await otpDocument.save();

    // Return successful response with customer info and OTP
    return res.status(201).json({
      status: "success",
      message: "Customer registered successfully. OTP has been sent for verification.",
      customer: {
        id: savedCustomer._id,
        firstname: savedCustomer.firstname,
        lastname: savedCustomer.lastname,
        email: savedCustomer.email,
        roles: savedCustomer.roles,
        token: savedCustomer.token,
      },
      otp: otpCode, // For now, sending OTP in response (you should ideally send via email or SMS)
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Server error. Please try again later.",
    });
  }
};

export default RegisterCustomer;
