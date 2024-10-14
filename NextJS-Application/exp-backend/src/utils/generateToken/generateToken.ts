import jwt from 'jsonwebtoken';
import prisma from '../../prisma/prismaClient';
import { JWT_REFRESH_KEY, JWT_ACCESS_KEY } from '../../constants';

interface Tokens {
  accessToken: string;
  refreshToken: string;
  accessTokenExp: number;
  refreshTokenExp: number;
}

interface UserPayload {
  id: number;
}

const generateTokens = async (user: UserPayload): Promise<Tokens> => {
  try {
    const payload = { id: user.id };

    const accessTokenExp = Math.floor(Date.now() / 1000) + 60 * 1;
    const accessToken = jwt.sign({ ...payload, exp: accessTokenExp }, JWT_ACCESS_KEY as string);
    
    const refreshTokenExp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7;
    const refreshToken = jwt.sign({ ...payload, exp: refreshTokenExp }, JWT_REFRESH_KEY as string);
    
    await prisma.token.deleteMany({
      where: {
        userId: user.id,
      },
    });
    
    await prisma.token.create({
      data: {
        userId: user.id,
        token: refreshToken,
        type: 'REFRESH', 
        expiresAt: new Date(refreshTokenExp * 1000), 
      },
    });

    return { accessToken, refreshToken, accessTokenExp, refreshTokenExp };
  } catch (error) {
    console.error('Failed to generate tokens:', error);
    throw new Error('Failed to generate tokens');
  }
};

export default generateTokens;
