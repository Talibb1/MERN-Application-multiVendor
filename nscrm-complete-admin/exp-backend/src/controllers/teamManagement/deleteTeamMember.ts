import { Request, Response } from "express";
import prisma from "../../prisma/prismaClient";

const deleteTeamMember = async (req: Request, res: Response): Promise<Response> => {
  const { email, organizationId } = req.body;

  const userId = parseInt(req.cookies.userId || "", 10);
  if (!email || isNaN(userId) || !organizationId) {
    return res.status(400).json({
      status: "failed",
      message: "Email, valid user ID, and organization ID are required.",
    });
  }

  try {
    // Check if the user making the request is an admin in the organization
    const userOrganizationRole = await prisma.organizationRole.findFirst({
      where: {
        userId: userId,
        organizationId: organizationId,
        role: 'ADMIN', // Only allow admins to delete members
      },
    });

    if (!userOrganizationRole) {
      return res.status(403).json({
        status: "failed",
        message: "Only admins can delete members from this organization.",
      });
    }

    // Check if the member exists in the organization
    const member = await prisma.user.findUnique({
      where: { email },
    });

    if (!member) {
      return res.status(404).json({
        status: "failed",
        message: `No user found with the email "${email}".`,
      });
    }

    // Check if the member is part of the organization
    const memberOrganizationRole = await prisma.organizationRole.findFirst({
      where: {
        userId: member.id,
        organizationId: organizationId,
      },
    });

    if (!memberOrganizationRole) {
      return res.status(400).json({
        status: "failed",
        message: "User is not a member of this organization.",
      });
    }

    // Find all leads in the organization
    const leadsInOrg = await prisma.lead.findMany({
      where: {
        organizationId: organizationId,
      },
    });

    // Get all leadIds from the found leads
    const leadIds = leadsInOrg.map(lead => lead.id);

    // Delete the user's access to leads in the organization
    await prisma.leadAccess.deleteMany({
      where: {
        userId: member.id,
        leadId: {
          in: leadIds, // Use the leadIds for the organization
        },
      },
    });

    // Delete the user's role in the organization
    await prisma.organizationRole.deleteMany({
      where: {
        userId: member.id,
        organizationId: organizationId,
      },
    });

    return res.status(200).json({
      status: "success",
      message: "Member deleted from the organization successfully.",
    });
  } catch (error) {
    console.error("Member deletion error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Server error. Please try again later.",
    });
  }
};

export default deleteTeamMember;
