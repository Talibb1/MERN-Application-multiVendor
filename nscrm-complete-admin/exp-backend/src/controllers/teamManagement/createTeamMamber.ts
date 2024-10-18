import { Request, Response } from "express";
import prisma from "../../prisma/prismaClient";
import sendEmail from "../../utils/SentEmail/sendWelcomeEmail";

export const createTeam = async (req: Request, res: Response): Promise<Response> => {
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
        role: { in: ["ADMIN", "SUPERADMIN"] },
      },
    });

    if (!userOrganizationRole) {
      return res.status(403).json({
        status: "failed",
        message: "Only admins or superadmins can assign roles to users in this organization.",
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

    const assignedRole = role || existingUser.defaultRoleId;

    const newOrganizationRole = await prisma.organizationRole.create({
      data: {
        userId: existingUser.id,
        organizationId: organizationId,
        role: assignedRole,
      },
    });

    // Update the organization for the user
    await prisma.user.update({
      where: { id: existingUser.id },
      data: {
        organization: {
          connect: { id: organizationId },
        },
        memberOfOrganizations: {
          connect: { id: organizationId },
        },
      },
    });

    const organization = await prisma.organization.findUnique({
      where: { id: organizationId },
    });

    if (organization) {
      const name = existingUser.firstName;
      const orgName = organization.name;
      await sendEmail(existingUser.email, name, orgName);
    }

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
