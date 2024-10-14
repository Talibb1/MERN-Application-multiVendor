import { Request, Response } from "express";
import prisma from "../../prisma/prismaClient";

const createTeam = async (req: Request, res: Response): Promise<Response> => {
  const { email, role, organizationId } = req.body;

  const userId = parseInt(req.cookies.userId || "", 10);
  if (!email || !role || isNaN(userId) || !organizationId) {
    return res.status(400).json({
      status: "failed",
      message: "Email, role, valid user ID, and organization ID are required.",
    });
  }
  try {
    const userOrganizationRole = await prisma.organizationRole.findFirst({
      where: {
        userId: userId,
        organizationId: organizationId,
        role: "ADMIN",
      },
    });

    if (!userOrganizationRole) {
      return res.status(403).json({
        status: "failed",
        message: "Only admins can assign roles to users in this organization.",
      });
    }
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      return res.status(404).json({
        status: "failed",
        message: `No user found with the email "${email}".`,
      });
    }
    const existingOrgRole = await prisma.organizationRole.findFirst({
      where: {
        userId: existingUser.id,
        organizationId: organizationId,
      },
    });

    if (existingOrgRole) {
      return res.status(400).json({
        status: "failed",
        message: "User is already a member of this organization.",
      });
    }
    const newOrganizationRole = await prisma.organizationRole.create({
      data: {
        userId: existingUser.id,
        organizationId: organizationId,
        role: role,
      },
    });

    return res.status(201).json({
      status: "success",
      message: "Member added to the organization successfully.",
      data: newOrganizationRole,
    });
  } catch (error) {
    console.error("Error creating team member:", error);
    return res.status(500).json({
      status: "failed",
      message: "Server error. Please try again later.",
    });
  }
};

export default createTeam;
