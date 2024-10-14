import { Request, Response } from "express";
import prisma from "../../prisma/prismaClient";

export const GetTeam = async (req: Request, res: Response) => {
  try {
    const organizationId = parseInt(req.params.id, 10);
    const teamMembers = await prisma.organizationRole.findMany({
      where: { organizationId: Number(organizationId) },
      include: {
        user: true,
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
