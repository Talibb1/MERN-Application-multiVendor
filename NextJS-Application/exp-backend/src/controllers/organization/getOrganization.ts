import { Request, Response } from "express";
import prisma from "../../prisma/prismaClient";

const getOrganization = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    const organization = await prisma.organization.findUnique({
      where: { id: parseInt(id, 10) },
      include: {
        owner: true,
        users: true,
        leads: true,
      },
    });

    if (!organization) {
      return res.status(404).json({
        status: "failed",
        message: "Organization not found.",
      });
    }

    return res.status(200).json({
      status: "success",
      data: organization,
    });
  } catch (error) {
    console.error("Get organization error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Server error. Please try again later.",
    });
  }
};

export default getOrganization;
