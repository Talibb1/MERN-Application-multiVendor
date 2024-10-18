import { Request, Response } from "express";
import prisma from "../../prisma/prismaClient"; // Assuming Prisma client is initialized here

const updateTeamMemberRole = async (req: Request, res: Response): Promise<Response> => {
    const { email, newRole, organizationId } = req.body;
    const userId = parseInt(req.cookies.userId || "", 10);

    // Validate input
    if (!email || !newRole || isNaN(userId) || !organizationId) {
        return res.status(400).json({
            status: "failed",
            message: "Email, new role, valid user ID, and organization ID are required.",
        });
    }

    try {
        // Check if the logged-in user has permission (is ADMIN or SUPERADMIN) in this organization
        const userOrganizationRole = await prisma.organizationRole.findFirst({
            where: {
                userId,
                organizationId,
            },
        });

        if (!userOrganizationRole || !['ADMIN', 'SUPERADMIN'].includes(userOrganizationRole.role)) {
            return res.status(403).json({
                status: "failed",
                message: "Only admins or superadmins can update roles in this organization.",
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

        // Update the member's role in the organization
        const updatedRole = await prisma.organizationRole.updateMany({
            where: {
                userId: member.id,
                organizationId,
            },
            data: {
                role: newRole, // Set the new role
            },
        });

        if (updatedRole.count === 0) {
            return res.status(404).json({
                status: "failed",
                message: `User is not part of the specified organization.`,
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Member role updated successfully.",
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
