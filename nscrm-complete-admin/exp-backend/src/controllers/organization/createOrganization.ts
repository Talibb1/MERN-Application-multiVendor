import { Request, Response } from "express";
import prisma from "../../prisma/prismaClient";
import { AccessRole } from "@prisma/client";

const createOrganization = async (req: Request, res: Response): Promise<Response> => {
  const { name } = req.body;
  const userId = parseInt(req.cookies.userId || "", 10);
  
  if (!name || isNaN(userId)) {
    return res.status(400).json({
      status: "failed",
      message: "Organization name and valid user ID are required.",
    });
  }

  try {
    const existingOrganization = await prisma.organization.findFirst({
      where: {
        name: {
          equals: name,
        },
      },
    });

    if (existingOrganization) {
      return res.status(400).json({
        status: "failed",
        message: `Organization with the name "${name}" already exists.`,
      });
    }
    const newOrganization = await prisma.organization.create({
      data: {
        name,
        ownerId: userId,
      },
    });
    await prisma.organizationRole.create({
      data: {
        userId: userId,
        organizationId: newOrganization.id,
        role: AccessRole.ADMIN,
      },
    });

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (user?.organizationId === null) {
      await prisma.user.update({
        where: { id: userId },
        data: {
          organizationId: newOrganization.id,
        },
      });
    }

    const updatedUser = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        ownedOrganizations: true,
        organization: true,
      },
    });

    return res.status(201).json({
      status: "success",
      message: "Organization created successfully, and user assigned Admin role.",
      data: {
        organization: newOrganization,
        user: updatedUser,
      },
    });
  } catch (error) {
    console.error("Organization creation error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Server error. Please try again later.",
    });
  }
};

export default createOrganization;
