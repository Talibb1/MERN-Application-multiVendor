import { Request, Response } from "express";
import prisma from "../../prisma/prismaClient";

const DeleteUser = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      status: "failed",
      message: "User ID is required.",
    });
  }
  try {
    const existingUser = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });
    if (!existingUser) {
      return res.status(404).json({
        status: "failed",
        message: "User not found.",
      });
    }
    await prisma.user.delete({
      where: { id: parseInt(id) },
    });
    return res.status(200).json({
      status: "success",
      message: "User and all related data deleted successfully.",
    });
  } catch (error) {
    console.error("User deletion error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Server error. Please try again later.",
    });
  }
};

export default DeleteUser;
