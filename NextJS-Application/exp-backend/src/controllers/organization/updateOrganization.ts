import { Request, Response } from "express";
import prisma from "../../prisma/prismaClient";

const updateOrganization = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const { name } = req.body;

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

    const updatedOrganization = await prisma.organization.update({
      where: { id: parseInt(id, 10) },
      data: {
        name,
      },
    });

    return res.status(200).json({
      status: "success",
      message: "Organization updated successfully.",
      data: updatedOrganization,
    });
  } catch (error) {
    console.error("Update organization error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Server error. Please try again later.",
    });
  }
};

export default updateOrganization;
