import { Request, Response } from "express";
import { Customer } from '../../models/Customer';
import VerifyRefreshToken from "./verifyRefreshToken.js";
import generateTokens from "../generate/generateToken.js";

interface RefreshTokenResponse {
  newAccessToken: string;
  newRefreshToken: string;
  newAccessTokenExp: number;
  newRefreshTokenExp: number;
}

// Extend Request interface to include customerId
interface CustomRequest extends Request {
  customerId: string; 
}

const refreshAccessToken = async (
  req: CustomRequest,
  res: Response
): Promise<RefreshTokenResponse | void> => {
  try {
    const oldRefreshToken = req.cookies.refreshToken;
    if (!oldRefreshToken) {
      res.status(401).json({ message: "Refresh token not provided" });
      return; 
    }

    const { tokenDetails, error, message } = await VerifyRefreshToken(oldRefreshToken);

    if (error) {
      res.status(400).json({ message });
      return; 
    }

    // Ensure tokenDetails is of type JwtPayload
    if (typeof tokenDetails !== 'object' || !('id' in tokenDetails)) {
      res.status(400).json({ message: "Invalid token details" });
      return;
    }

    // Find the customer in the MongoDB database
    const customer = await Customer.findById(tokenDetails.id); 
    if (!customer) {
      res.status(404).json({ message: "Customer not found" });
      return; 
    }

    // Check if the refresh token is already present in the customer's tokens
    const customerRefreshToken = customer.refreshTokens.find(token => token.token === oldRefreshToken);
    if (!customerRefreshToken) {
      res.status(400).json({ message: "Invalid refresh token" });
      return; 
    }

    // Generate new tokens using the customer information
    const { accessToken, refreshToken, accessTokenExp, refreshTokenExp } =
    await generateTokens({ id: (customer._id as string).toString() });

    // Update the customer's refresh tokens by replacing the old token with the new one
    customer.refreshTokens = customer.refreshTokens.filter(token => token.token !== oldRefreshToken);
    customer.refreshTokens.push({ token: refreshToken, expiresAt: new Date(Date.now() + refreshTokenExp * 1000) });
    await customer.save();

    // Return new tokens and their expiration times
    res.status(200).json({
      newAccessToken: accessToken,
      newRefreshToken: refreshToken,
      newAccessTokenExp: accessTokenExp,
      newRefreshTokenExp: refreshTokenExp,
    });
  } catch (error: unknown) {
    const errorMessage = (error instanceof Error) ? error.message : "An unknown error occurred";
    res.status(500).json({
      message: errorMessage,
    });
    throw new Error(errorMessage);
  }
};

export default refreshAccessToken;
