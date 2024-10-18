import { Request, Response, NextFunction } from "express";
import prisma from '../../prisma/prismaClient';
import { AppError } from '../../utils/AppError';
import logger from '../../utils/logger'; 

const LogoutUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return next(new AppError("Refresh token is missing.", 400));
    }

    const tokenRecord = await prisma.token.findUnique({
      where: { token: refreshToken },
    });

    if (!tokenRecord || tokenRecord.type !== "REFRESH") {
      return next(new AppError("Refresh token not found or invalid.", 404));
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
      message: "Successfully logged out.",
    });
    
  } catch (error: any) {
    logger.error({
      message: "Logout error",
      stack: error.stack,
      method: req.method,
      url: req.originalUrl,
      ip: req.ip,
    });
    next(new AppError("An error occurred while processing your logout request. Please try again later.", 500));
  }
};

export default LogoutUser;
