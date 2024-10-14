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
          message: "Only admins can delete members from this organization.",
        });
      }
  
      // Check if the user exists in the organization
      const member = await prisma.user.findUnique({
        where: { email },
      });
  
      if (!member) {
        return res.status(404).json({
          status: "failed",
          message: `No user found with the email "${email}".`,
        });
      }
  
      // Delete the user's access to leads in the organization
      await prisma.leadAccess.deleteMany({
        where: {
          userId: member.id,
          leadId: req.body.leadId, // Assuming leadId is provided to specify which lead access to remove
        },
      });
  
      return res.status(200).json({
        status: "success",
        message: "Member deleted successfully.",
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
  