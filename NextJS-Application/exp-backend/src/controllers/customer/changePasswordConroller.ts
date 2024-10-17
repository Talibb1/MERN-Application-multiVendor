import { Request, Response } from "express";
import bcrypt from "bcrypt";
import prisma from "../../prisma/prismaClient";
import { SALT } from "../../constants";

interface AuthenticatedRequest extends Request {
  id?: string;
}

const changeUserPassword = async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  try {
    const { currentPassword, newPassword, newPasswordConfirmation } = req.body;


    if (!currentPassword || !newPassword || !newPasswordConfirmation) {
      return res.status(400).json({
        status: "failed",
        message: "All fields are required",
      });
    }

    if (newPassword !== newPasswordConfirmation) {
      return res.status(400).json({
        status: "failed",
        message: "New password and confirmation do not match",
      });
    }

    if (!req.id) {
      return res.status(401).json({
        status: "failed",
        message: "Unauthorized, user ID not found",
      });
    }
    const user = await prisma.user.findUnique({
      where: { id: parseInt(req.id) },
    });

    if (!user || !user.password) {
      return res.status(404).json({
        status: "failed",
        message: "User not found or password is missing",
      });
    }
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({
        status: "failed",
        message: "Current password is incorrect",
      });
    }

    const salt = await bcrypt.genSalt(Number(SALT));
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    await prisma.user.update({
      where: { id: parseInt(req.id) },
      data: {
        password: hashedNewPassword,
        updatedAt: new Date(),
      },
    });

    return res.status(200).json({
      status: "success",
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Error changing password:", error);
    return res.status(500).json({
      status: "failed",
      message: "An internal server error occurred. Please try again later.",
    });
  }
};

export default changeUserPassword;
