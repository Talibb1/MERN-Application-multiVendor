import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "../../prisma/prismaClient";
import { JWT_REFRESH_KEY } from "../../constants";

interface TokenDetails {
  tokenDetails: JwtPayload | string;
  error: boolean;
  message: string;
}

const verifyRefreshToken = async (
  refreshToken: string
): Promise<TokenDetails> => {
  try {
    const userRefreshToken = await prisma.token.findUnique({
      where: {
        token: refreshToken,
      },
    });

    if (!userRefreshToken) {
      throw new Error("Invalid refresh token");
    }
    const tokenDetails = jwt.verify(
      refreshToken,
      JWT_REFRESH_KEY as string
    ) as JwtPayload;
    if (!tokenDetails || !tokenDetails.id) {
      throw new Error("Invalid refresh token details");
    }
    return {
      tokenDetails,
      error: false,
      message: "Valid refresh token",
    };
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return {
        tokenDetails: "",
        error: true,
        message: "Refresh token has expired",
      };
    }
    return {
      tokenDetails: "",
      error: true,
      message: error.message,
    };
  }
};

export default verifyRefreshToken;
