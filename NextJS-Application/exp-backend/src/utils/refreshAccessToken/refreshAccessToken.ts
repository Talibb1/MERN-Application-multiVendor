import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client"; 
import verifyRefreshToken from "./verifyRefreshToken.js";
import generateTokens from "../generateToken/generateToken.js";

const prisma = new PrismaClient();

interface RefreshTokenResponse {
  newAccessToken: string;
  newRefreshToken: string;
  newAccessTokenExp: number;
  newRefreshTokenExp: number;
  userId: number;
}

const refreshAccessToken = async (
  req: Request,
  res: Response
): Promise<RefreshTokenResponse> => {
  try {
    const oldRefreshToken = req.cookies.refreshToken;
    if (!oldRefreshToken) {
      throw new Error("Refresh token not provided");
    }

    const { tokenDetails } = await verifyRefreshToken(oldRefreshToken);

    if (typeof tokenDetails === 'object' && 'id' in tokenDetails) {
      const user = await prisma.user.findUnique({
        where: { id: tokenDetails.id },
      });
      if (!user) {
        throw new Error("User not found");
      }

      const { accessToken, refreshToken, accessTokenExp, refreshTokenExp } =
        await generateTokens(user);
      return {
        newAccessToken: accessToken,
        newRefreshToken: refreshToken,
        newAccessTokenExp: accessTokenExp,
        newRefreshTokenExp: refreshTokenExp,
        userId: user.id,
      };
    } else {
      throw new Error("Invalid token details");
    }
  } catch (error: unknown) {
    const errorMessage = (error instanceof Error) ? error.message : "An unknown error occurred";
    res.status(500).json({
      message: errorMessage,
    });
    throw new Error(errorMessage);
  }
};

export default refreshAccessToken;
