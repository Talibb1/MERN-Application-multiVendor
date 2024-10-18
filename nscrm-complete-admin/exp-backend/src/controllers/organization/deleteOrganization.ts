import { Request, Response } from "express";
import prisma from "../../prisma/prismaClient";
import { AppError } from "../../utils/AppError";
import logger from "../../utils/logger";

const deleteOrganization = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    const organization = await prisma.organization.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!organization) {
      throw new AppError("Organization not found", 404);
    }
    await prisma.organization.delete({
      where: { id: parseInt(id, 10) },
    });

    return res.status(200).json({
      status: "success",
      message: "Organization and related data deleted successfully.",
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    logger.error("Delete organization error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Server error. Please try again later.",
    });
  }
};

export default deleteOrganization;
