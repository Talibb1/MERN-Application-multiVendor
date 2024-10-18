import { Request, Response } from "express";
import prisma from "../../prisma/prismaClient";
import logger from "../../utils/logger";

const GetLeads = async (req: Request, res: Response): Promise<Response> => {
  const userId = parseInt(req.cookies.userId || "", 10);

  if (isNaN(userId)) {
    return res.status(400).json({
      status: "failed",
      message: "Invalid user ID.",
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { organization: true },
    });
  
    // Check if the user belongs to an organization
    if (!user || !user.organization) {
      return res.status(403).json({
        status: "failed",
        message: "User is not part of any organization.",
      });
    }

    // Fetch only the leads associated with the user's organization
    const leads = await prisma.lead.findMany({
      where: {
        organizationId: user.organization.id, // Filter leads by user's organization
      },
      include: {
        contacts: true, // Include related contacts
      },
    });

    return res.status(200).json({
      status: "success",
      data: leads,
    });
  } catch (error) {
    logger.error("Error fetching leads:", error);
    return res.status(500).json({
      status: "failed",
      message: "Server error. Please try again later.",
    });
  }
};

export default GetLeads;
