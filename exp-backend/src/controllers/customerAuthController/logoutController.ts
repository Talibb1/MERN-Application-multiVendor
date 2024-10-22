import { Request, Response } from "express";
import { Customer } from '../../models/Customer'; // Ensure to import your Customer model

export const LogoutCustomer = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(400).json({
        status: "failed",
        message: "Refresh token is missing",
      });
    }

    // Find customer based on the refresh token
    const customer = await Customer.findOne({
      refreshTokens: { $elemMatch: { token: refreshToken } }, 
    });

    if (!customer) {
      return res.status(404).json({
        status: "failed",
        message: "Refresh token not found or invalid",
      });
    }

    // Remove the refresh token from the customer's refreshTokens array
    customer.refreshTokens = customer.refreshTokens.filter(rt => rt.token !== refreshToken);
    await customer.save(); // Save the updated customer document

    // Optionally set isActive to false if required
    customer.isActive = false;
    await customer.save();

    // Clear cookies
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.clearCookie("isAuth");

    return res.status(200).json({
      status: "success",
      message: "Successfully logged out",
    });
  } catch (error) {
    console.error("Error during logout:", error);
    return res.status(500).json({
      status: "failed",
      message: "An error occurred while processing your request. Please try again later.",
    });
  }
};
