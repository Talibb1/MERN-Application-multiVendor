import { Request, Response } from "express";
import prisma from "../../prisma/prismaClient";

const deleteOrganization = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    const organization = await prisma.organization.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!organization) {
      return res.status(404).json({
        status: "failed",
        message: "Organization not found.",
      });
    }
    await prisma.organization.delete({
      where: { id: parseInt(id, 10) },
    });

    return res.status(200).json({
      status: "success",
      message: "Organization deleted successfully.",
    });
  } catch (error) {
    console.error("Delete organization error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Server error. Please try again later.",
    });
  }
};

export default deleteOrganization;
