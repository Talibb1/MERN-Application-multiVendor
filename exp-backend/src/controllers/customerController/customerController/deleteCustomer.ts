import { Request, Response } from "express";
import { Customer } from "../../../models/Customer";

export const DeleteCustomer = async (req: Request, res: Response) => {
    try {
      const { customerId } = req.params;
  
      // Find the customer by ID and delete permanently
      const customer = await Customer.findByIdAndDelete(customerId);
  
      if (!customer) {
        return res.status(404).json({ message: "Customer not found" });
      }
  
      return res.status(200).json({ message: "Customer permanently deleted", customer });
    } catch (error) {
      return res.status(500).json({ message: "An error occurred", error });
    }
  };
  