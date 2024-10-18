import { Request, Response } from "express";
import bcrypt from "bcrypt";
import axios from "axios"; // Import Axios for API requests
import { Customer } from "../../models/customer";
import { Country } from "../../models/address"; // Import Country model
import { SALT } from "../../config/env";

export const RegisterCustomer = async (req: Request, res: Response): Promise<Response> => {
  const { firstname, lastname, email, password } = req.body;
  const ip = req.ip; // Fetch the user's IP address

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

    // Fetch country information based on IP address
    const locationResponse = await axios.get(`http://ip-api.com/json/${ip}`);
    const locationData = locationResponse.data;

    // You can fetch additional fields as needed
    const countryData = {
      name: locationData.country,
      isoCode2: locationData.countryCode,
      // Add more fields as necessary from locationData
    };

    // Check if country exists in the database
    let country = await Country.findOne({ isoCode2: countryData.isoCode2 }).lean();

    if (!country) {
      // If country doesn't exist, create a new one (optional)
      country = new Country({
        ...countryData,
        addressFormat: "", // Set default if necessary
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

    const hashedPassword = await bcrypt.hash(password, Number(SALT));

    const newCustomer = new Customer({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      telephone: req.body.telephone || undefined,
      authProvider: ["local"],
      roles: ["customer"],
      status: true,
      countryId: country._id, // Save the country ID with the customer
    });

    // Save the customer in the database
    const savedCustomer = await newCustomer.save();

    // Return successful response with country information
    return res.status(201).json({
      status: "success",
      message: "Customer registered successfully.",
      customer: {
        id: savedCustomer._id,
        firstname: savedCustomer.firstname,
        lastname: savedCustomer.lastname,
        email: savedCustomer.email,
        telephone: savedCustomer.telephone,
        roles: savedCustomer.roles,
        country: {
          id: country._id,
          name: country.name,
          isoCode2: country.isoCode2,
          // Add more fields if necessary
        },
      },
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
