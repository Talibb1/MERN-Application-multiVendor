import { Request, Response } from "express";
import prisma from "../../prisma/prismaClient";

const getOrganizationsByUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  try {
    const organizations = await prisma.organization.findMany({
      where: {
        OR: [
          { ownerId: parseInt(id, 10) },
          {
            users: {
              some: {
                id: parseInt(id, 10),
              },
            },
          },
        ],
      },
      include: {
        owner: true,
        users: true,
        leads: true,
      },
    });
    if (organizations.length === 0) {
      return res.status(404).json({
        status: "failed",
        message: "No organizations found for this user.",
      });
    }

    return res.status(200).json({
      status: "success",
      data: organizations,
    });
  } catch (error) {
    console.error("Get organizations by user error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Server error. Please try again later.",
    });
  }
};

export default getOrganizationsByUser;
