import { Request, Response } from "express";
import prisma from "../../prisma/prismaClient";
const updateTeamMemberRole = async (req: Request, res: Response): Promise<Response> => {
    const { email, newRole, organizationId } = req.body;
  
    const userId = parseInt(req.cookies.userId || "", 10);
    if (!email || !newRole || isNaN(userId) || !organizationId) {
      return res.status(400).json({
        status: "failed",
        message: "Email, new role, valid user ID, and organization ID are required.",
      });
    }
  
    try {
      // Check if the organization is valid for the current user (the admin)
      const userOrganizationRole = await prisma.organizationRole.findFirst({
        where: {
          userId: userId,
          organizationId: organizationId,
        },
      });
  
      if (!userOrganizationRole || userOrganizationRole.role !== 'ADMIN') {
        return res.status(403).json({
          status: "failed",
          message: "Only admins can update roles in this organization.",
        });
      }
  
      // Find the member by email
      const member = await prisma.user.findUnique({
        where: { email },
      });
  
      if (!member) {
        return res.status(404).json({
          status: "failed",
          message: `No user found with the email "${email}".`,
        });
      }
  
      // Update the user's role
      const updatedAccess = await prisma.leadAccess.updateMany({
        where: {
          userId: member.id,
          leadId: req.body.leadId, // Assuming leadId is provided to specify which lead access to update
        },
        data: {
          role: newRole,
        },
      });
  
      if (updatedAccess.count === 0) {
        return res.status(404).json({
          status: "failed",
          message: `User does not have access to the specified lead.`,
        });
      }
  
      return res.status(200).json({
        status: "success",
        message: "Member role updated successfully.",
        data: updatedAccess,
      });
    } catch (error) {
      console.error("Role update error:", error);
      return res.status(500).json({
        status: "failed",
        message: "Server error. Please try again later.",
      });
    }
  };
  
  export default updateTeamMemberRole;
  