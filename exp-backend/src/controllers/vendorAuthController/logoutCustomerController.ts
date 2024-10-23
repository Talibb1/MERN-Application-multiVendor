import { Request, Response } from "express";
import { Customer } from '../../models/Customer';
import { CustomerActivity, ActivityType } from '../../models/Customer'; // Import the activity model
import logger from '../../logs/logger';

export const LogoutCustomer = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      logger.warn("Logout attempt without a refresh token.");
      return res.status(400).json({
        status: "failed",
        message: "Refresh token is missing",
      });
    }
    const customer = await Customer.findOne({
      "refreshTokens.token": refreshToken,
    });

    if (!customer) {
      logger.warn(`Logout attempt with invalid refresh token: ${refreshToken}`);
      return res.status(404).json({
        status: "failed",
        message: "Refresh token not found or invalid",
      });
    }

    // Remove the refresh token from the customer's tokens
    const tokensBefore = customer.refreshTokens.length;
    customer.refreshTokens = customer.refreshTokens.filter(rt => rt.token !== refreshToken);
    const tokensAfter = customer.refreshTokens.length;

    if (tokensBefore === tokensAfter) {
      logger.warn(`Refresh token was not found in customer tokens: ${refreshToken}`);
    }

    customer.isActive = false;
    await customer.save();
    
    // Save logout activity
    await CustomerActivity.create({
      customerId: customer._id,
      activityType: ActivityType.LOGOUT, // Log the logout activity
      activityData: {
        action: 'User logged out',
        timestamp: new Date(),
      },
    });

    // Clear cookies
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.clearCookie("isAuth");

    logger.info(`Customer with email: ${customer.email} successfully logged out`);
    return res.status(200).json({
      status: "success",
      message: "Successfully logged out",
    });
  } catch (error: any) {
    logger.error(`Error during logout for refresh token ${req.cookies.refreshToken}: ${error.message}`);
    return res.status(500).json({
      status: "failed",
      message: "An error occurred while processing your request. Please try again later.",
    });
  }
};
