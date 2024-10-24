
import { Request, Response } from "express";
import { Customer } from "../../../models/Customer";
import logger from "../../../logs/logger";

export const CustomerProfile = async (req: Request, res: Response) => {
  try {
    // Check if the user is authenticated
    if (!req.user) {
      logger.warn("Unauthorized access attempt to userProfile");
      return res.status(401).json({ error: "Unauthorized" });
    }
    const customer = await Customer.findById(req.user.id)
      .select("firstname lastname email avatar countryId telephone googleId facebookId appleId roles")
      .lean(); // Using lean for optimization

    // Check if the customer exists
    if (!customer) {
      logger.warn(`Customer not found for user ID: ${req.user.id}`);
      return res.status(404).json({ error: "Customer not found" });
    }

    // Return the customer data
    return res.status(200).json({ 
      customer: {
        id: customer._id,
        firstname: customer.firstname,
        lastname: customer.lastname,
        email: customer.email,
        avatar: customer.avatar,
        countryId: customer.countryId,
        telephone: customer.telephone,
        googleId: customer.googleId,
        facebookId: customer.facebookId,
        appleId: customer.appleId,
        roles: customer.roles,
      }
    });
  } catch (error: any) {
    // Log the error details with winston
    logger.error(`Error in userProfile for user ID: ${req.user?.id}`, {
      message: error.message,
      stack: error.stack,
    });

    return res.status(500).json({ error: "Internal Server Error" });
  }
};
