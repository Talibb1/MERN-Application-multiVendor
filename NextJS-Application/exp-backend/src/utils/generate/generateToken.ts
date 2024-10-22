import jwt from 'jsonwebtoken';
import { JWT_REFRESH_KEY, JWT_ACCESS_KEY } from '../../config/env';
import { Customer } from '../../models/customer';

interface Tokens {
  accessToken: string;
  refreshToken: string;
  accessTokenExp: number;
  refreshTokenExp: number;
}

interface UserPayload {
  id: string; // Assuming your customer ID is a string (ObjectId)
}

const generateTokens = async (customer: UserPayload): Promise<Tokens> => {
  try {
    const payload = { id: customer.id };

    const accessTokenExp = Math.floor(Date.now() / 1000) + 60 * 1;
    const accessToken = jwt.sign({ ...payload, exp: accessTokenExp }, JWT_ACCESS_KEY as string);
    
    const refreshTokenExp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7;
    const refreshToken = jwt.sign({ ...payload, exp: refreshTokenExp }, JWT_REFRESH_KEY as string);
    
    // Remove existing refresh tokens for the customer
    await Customer.updateOne(
      { _id: customer.id },
      { $set: { refreshTokens: [] } } // Clear old refresh tokens
    );

    // Save the new refresh token in the customer document
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
  } catch (error) {
    console.error('Failed to generate tokens:', error);
    throw new Error('Failed to generate tokens');
  }
};

export default generateTokens;
