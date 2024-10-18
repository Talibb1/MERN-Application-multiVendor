import { Request, Response } from "express";
import prisma from "../../prisma/prismaClient";
import logger from "../../utils/logger";

const GetLeadById = async (req: Request, res: Response): Promise<Response | void> => {
  const leadId = parseInt(req.params.id, 10);
  const userId = parseInt(req.cookies.userId || "", 10);

  // Validate lead ID
  if (isNaN(leadId)) {
    return res.status(400).json({
      status: "failed",
      message: "Invalid lead ID.",
    });
  }

  try {
    // Fetch user along with their organization
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { organization: true },
    });

    // Check if the user or their organization is not found
    if (!user || !user.organization) {
      return res.status(403).json({
        status: "failed",
        message: "User is not part of any organization.",
      });
    }

    // Fetch the lead along with its organization
    const lead = await prisma.lead.findUnique({
      where: { id: leadId },
      include: {
        contacts: true,
        organization: true, // Include the organization to verify it belongs to the user's organization
      },
    });

    // Check if lead exists
    if (!lead) {
      return res.status(404).json({
        status: "failed",
        message: "Lead not found.",
      });
    }

    // Ensure the lead has an associated organization
    if (!lead.organization) {
      return res.status(400).json({
        status: "failed",
        message: "Lead is not associated with any organization.",
      });
    }

    // console.log("Lead found:", lead.organization.id, user.organization.id);
    // // Ensure the lead belongs to the user's organization
    // if (lead.organization.id !== user.organization.id) {
    //   return res.status(403).json({
    //     status: "failed",
    //     message: "You are not authorized to view this lead as it doesn't belong to your organization.",
    //   });
    // }

    // If all checks pass, return the lead
    return res.status(200).json({
      status: "success",
      data: lead,
    });
  } catch (error) {
    logger.error("Error fetching lead:", error);
    return res.status(500).json({
      status: "failed",
      message: "Server error. Please try again later.",
    });
  }
};

export default GetLeadById;
