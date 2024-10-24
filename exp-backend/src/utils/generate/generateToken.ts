import jwt from 'jsonwebtoken';
import { JWT_REFRESH_KEY, JWT_ACCESS_KEY } from '../../config/env';
import { Customer } from '../../models/Customer';
import logger from '../../logs/logger';
import { AppError } from '../../middleware/errors';

interface Tokens {
  accessToken: string;
  refreshToken: string;
  accessTokenExp: number;
  refreshTokenExp: number;
}

interface UserPayload {
  id: string;
}

const generateTokens = async (customer: UserPayload): Promise<Tokens> => {
  try {
    const payload = { id: customer.id };

    const accessTokenExp = Math.floor(Date.now() / 1000) + 60 * 1; // 1 minute expiration
    const accessToken = jwt.sign({ ...payload, exp: accessTokenExp }, JWT_ACCESS_KEY as string);
    
    const refreshTokenExp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7; // 7 days expiration
    const refreshToken = jwt.sign({ ...payload, exp: refreshTokenExp }, JWT_REFRESH_KEY as string);
    
    await Customer.updateOne(
      { _id: customer.id },
      { $set: { refreshTokens: [] } }
    );
    await Customer.updateOne(
      { _id: customer.id },
      {
        $push: {
          refreshTokens: {
            token: refreshToken,
            expiresAt: new Date(refreshTokenExp * 1000),
          },
        },
      }
    );

    return { accessToken, refreshToken, accessTokenExp, refreshTokenExp };
  } catch (error: any) {
    logger.error(`Failed to generate tokens for customer ID: ${customer.id}`, {
      message: error instanceof AppError ? error.message : 'Unknown error',
      stack: error.stack,
    });
    if (!(error instanceof AppError)) {
      throw new AppError('Failed to generate tokens', 500);
    } else {
      throw error;
    }
  }
};

export default generateTokens;
