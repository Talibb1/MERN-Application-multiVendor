import { Request, Response } from "express";
import { Customer } from '../../models/Customer';
import VerifyRefreshToken from "./verifyRefreshToken";
import generateTokens from "../generate/generateToken";
import logger from '../../logs/logger';
import { AppError } from '../../middleware/errors';

interface RefreshTokenResponse {
  newAccessToken: string;
  newRefreshToken: string;
  newAccessTokenExp: number;
  newRefreshTokenExp: number;
}

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
      throw new AppError("Refresh token not provided", 401);
    }

    const { tokenDetails, error, message } = await VerifyRefreshToken(oldRefreshToken);

    if (error) {
      throw new AppError(message, 400);
    }
    if (typeof tokenDetails !== 'object' || !('id' in tokenDetails)) {
      throw new AppError("Invalid token details", 400);
    }

    const customer = await Customer.findById(tokenDetails.id); 
    if (!customer) {
      throw new AppError("Customer not found", 404);
    }
    const customerRefreshToken = customer.refreshTokens.find(token => token.token === oldRefreshToken);
    if (!customerRefreshToken) {
      throw new AppError("Invalid refresh token", 400);
    }
    const { accessToken, refreshToken, accessTokenExp, refreshTokenExp } =
    await generateTokens({ id: (customer._id as string).toString() });

    customer.refreshTokens = customer.refreshTokens.filter(token => token.token !== oldRefreshToken);
    customer.refreshTokens.push({ token: refreshToken, expiresAt: new Date(Date.now() + refreshTokenExp * 1000) });
    await customer.save();
    res.status(200).json({
      newAccessToken: accessToken,
      newRefreshToken: refreshToken,
      newAccessTokenExp: accessTokenExp,
      newRefreshTokenExp: refreshTokenExp,
    });
  } catch (error: unknown) {
    const errorMessage = (error instanceof AppError) 
      ? error.message 
      : "An unknown error occurred";
    logger.error(`Internal server error: ${errorMessage}`); 
    res.status((error instanceof AppError) ? error.statusCode : 500).json({
      message: errorMessage,
    });
  }
};

export default refreshAccessToken;
