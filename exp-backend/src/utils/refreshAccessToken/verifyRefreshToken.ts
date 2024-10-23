import jwt, { JwtPayload } from "jsonwebtoken";
import { Customer } from "../../models/Customer";
import { JWT_REFRESH_KEY } from "../../config/env";

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
      throw new Error("Invalid refresh token");
    }

    // Find the refresh token in the customer's tokens
    const userRefreshToken = customer.refreshTokens.find(
      (token) => token.token === refreshToken
    );

    if (!userRefreshToken) {
      throw new Error("Invalid refresh token");
    }

    // Verify the refresh token
    const tokenDetails = jwt.verify(refreshToken, JWT_REFRESH_KEY as string) as JwtPayload;

    // Ensure token details have the expected properties
    if (!tokenDetails || typeof tokenDetails.id !== "string") {
      throw new Error("Invalid refresh token details");
    }

    // Check if the token is expired
    if (new Date() > userRefreshToken.expiresAt) {
      throw new Error("Refresh token has expired");
    }

    return {
      tokenDetails,
      error: false,
      message: "Valid refresh token",
    };
  } catch (error: any) {
    return {
      tokenDetails: {} as JwtPayload,
      error: true,
      message: error.message || "An error occurred while verifying the token",
    };
  }
};

export default verifyRefreshToken;
