import jwt, { JwtPayload } from "jsonwebtoken";
import { Customer } from "../../models/Customer";
import { JWT_REFRESH_KEY } from "../../config/env";
import { AppError } from '../../middleware/errors'; // Importing AppError
import logger from '../../logs/logger'; // Importing logger

interface TokenDetails {
  tokenDetails: JwtPayload; // Specify JwtPayload as the expected type
  error: boolean;
  message: string;
}

const verifyRefreshToken = async (
  refreshToken: string
): Promise<TokenDetails> => {
  try {
    // Find the customer based on the refresh token
    const customer = await Customer.findOne({
      "refreshTokens.token": refreshToken,
    });

    if (!customer) {
      throw new AppError("Invalid refresh token", 400); // Use AppError
    }

    // Find the refresh token in the customer's tokens
    const userRefreshToken = customer.refreshTokens.find(
      (token) => token.token === refreshToken
    );

    if (!userRefreshToken) {
      throw new AppError("Invalid refresh token", 400); // Use AppError
    }

    // Verify the refresh token
    const tokenDetails = jwt.verify(refreshToken, JWT_REFRESH_KEY as string) as JwtPayload;

    // Ensure token details have the expected properties
    if (!tokenDetails || typeof tokenDetails.id !== "string") {
      throw new AppError("Invalid refresh token details", 400); // Use AppError
    }

    // Check if the token is expired
    if (new Date() > userRefreshToken.expiresAt) {
      throw new AppError("Refresh token has expired", 400); // Use AppError
    }

    return {
      tokenDetails,
      error: false,
      message: "Valid refresh token",
    };
  } catch (error: any) {
    // Log error for debugging
    logger.error("Token verification error: ", {
      message: error.message,
      stack: error.stack,
    });

    // If the error is an instance of AppError, return it
    if (error instanceof AppError) {
      return {
        tokenDetails: {} as JwtPayload,
        error: true,
        message: error.message,
      };
    }

    // Handle other errors
    return {
      tokenDetails: {} as JwtPayload,
      error: true,
      message: "An error occurred while verifying the token",
    };
  }
};

export default verifyRefreshToken;
