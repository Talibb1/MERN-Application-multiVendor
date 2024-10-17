import { Request, Response } from "express";
import bcrypt from "bcrypt";
import Customer, { ICustomer, UserRole } from "../../models/customer";
import { SALT } from "../../config/env";

// Customer registration handler
const RegisterCustomer = async (req: Request, res: Response): Promise<Response> => {
  const {
    firstname,
    lastname,
    email,
    password,
  } = req.body;

  // Basic validation for required fields
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

    const hashedPassword = await bcrypt.hash(password, Number(SALT));

    // Create a new customer document
    const newCustomer: ICustomer = new Customer({
      customer_group_id: req.body.customer_group_id,
      store_id: req.body.store_id,
      language_id: req.body.language_id,
      address_id,
      firstname,
      lastname,
      email,
      password: hashedPassword,
      telephone: telephone || undefined,  // Optional field
      custom_field: custom_field || {},   // Default to empty object
      ip: req.ip,                         // Capture user IP address
      authProvider,                       // Default to "local" provider if not provided
      roles: [UserRole.USER],             // Assign default role as "USER"
      cart: [],                           // Initialize cart as empty
      wishlist: [],                       // Initialize wishlist as empty
      newsletter: false,                  // Newsletter subscription defaults to false
      status: true,                       // Active status by default
      token: generateToken(),             // Assuming you have a function to generate unique token
    });

    // Save the customer in the database
    const savedCustomer = await newCustomer.save();

    // Return successful response
    return res.status(201).json({
      status: "success",
      message: "Customer registered successfully.",
      customer: {
        id: savedCustomer._id,
        firstname: savedCustomer.firstname,
        lastname: savedCustomer.lastname,
        email: savedCustomer.email,
        address_id: savedCustomer.address_id,
        telephone: savedCustomer.telephone,
        roles: savedCustomer.roles,
        token: savedCustomer.token,
      },
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

// Helper function to generate a unique token (JWT or random string)
function generateToken(): string {
  return "uniqueTokenString"; // Replace with actual token generation logic
}
