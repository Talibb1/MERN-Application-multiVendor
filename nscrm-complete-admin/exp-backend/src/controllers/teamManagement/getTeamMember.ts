import { Request, Response } from "express";
import prisma from "../../prisma/prismaClient";

export const GetTeam = async (req: Request, res: Response) => {
  try {
    const organizationId = parseInt(req.params.id, 10);

    // Fetch team members and exclude the password field
    const teamMembers = await prisma.organizationRole.findMany({
      where: { organizationId: Number(organizationId) },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            avatar: true,
            address: true,
            phoneNumber: true,
            googleId: true,
            authProviders: true,
            isActive: true,
            roles: true,
            organizationRoles: true,
            defaultRoleId: true,
            leads: true,
            tasks: true,
            activityLogs: true,
            leadAccess: true,
            createdAt: true,
            updatedAt: true,
            isDeleted: true,
          },
        },
        organization: true,
      },
    });

    if (teamMembers.length === 0) {
      return res
        .status(404)
        .json({ message: "No team members found for this organization" });
    }

    return res.status(200).json(teamMembers);
  } catch (error: any) {
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

export default GetTeam;
