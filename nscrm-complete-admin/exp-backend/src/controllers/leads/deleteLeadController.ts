import { Request, Response } from "express";
import prisma from "../../prisma/prismaClient";
import logger from "../../utils/logger";

const DeleteLead = async (req: Request, res: Response): Promise<Response | void> => {
  const leadId = parseInt(req.params.id, 10);
  const userId = parseInt(req.cookies.userId || "", 10);

  // Validate lead ID
  if (isNaN(leadId)) {
    return res.status(400).json({
      status: "failed",
      message: "Invalid Lead ID.",
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { organization: true },
    });
    if (!user || !user.organization) {
      return res.status(403).json({
        status: "failed",
        message: "User is not part of any organization.",
      });
    }

    // Fetch the lead and its organization
    const existingLead = await prisma.lead.findUnique({
      where: { id: leadId },
      include: { organization: true }, // Include lead's organization info
    });

    // Check if the lead exists
    if (!existingLead) {
      return res.status(404).json({
        status: "failed",
        message: "Lead not found.",
      });
    }

    // Ensure that the lead belongs to the user's organization
    if (existingLead.organization.id !== user.organization.id) {
      return res.status(403).json({
        status: "failed",
        message: "You are not authorized to delete this lead as it doesn't belong to your organization.",
      });
    }

    // Proceed to delete the lead if validation passes
    await prisma.lead.delete({
      where: { id: leadId },
    });

    return res.status(200).json({
      status: "success",
      message: "Lead deleted successfully.",
    });
  } catch (error) {
    logger.error("Lead deletion error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Server error. Please try again later.",
    });
  }
};

export default DeleteLead;
