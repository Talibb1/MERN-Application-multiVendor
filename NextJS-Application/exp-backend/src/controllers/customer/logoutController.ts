import { Request, Response } from "express";
import prisma from '../../prisma/prismaClient';

const LogoutUser = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(400).json({
        status: "failed",
        message: "Refresh token is missing",
      });
    }
    const tokenRecord = await prisma.token.findUnique({
      where: {
        token: refreshToken,
      },
    });

    if (!tokenRecord || tokenRecord.type !== "REFRESH") {
      return res.status(404).json({
        status: "failed",
        message: "Refresh token not found or invalid",
      });
    }

    await prisma.token.delete({
      where: { token: refreshToken },
    });

    await prisma.user.update({
      where: { id: tokenRecord.userId },
      data: { isActive: false },
    });

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.clearCookie("isAuth");
    res.clearCookie("userId");

    return res.status(200).json({
      status: "success",
      message: "Successfully logged out",
    });
  } catch (error) {
    console.error("Error during logout:", error);
    return res.status(500).json({
      status: "failed",
      message: "An error occurred while processing your request. Please try again later.",
    });
  }
};

export default LogoutUser;
