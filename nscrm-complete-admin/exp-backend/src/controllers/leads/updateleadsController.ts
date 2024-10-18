import { Request, Response } from "express";
import prisma from "../../prisma/prismaClient";
import logger from "../../utils/logger";

const validStatuses = [
  "Potential",
  "Bad Fit",
  "Qualified",
  "Customer",
  "Interested",
  "Canceled",
  "Not Interested",
];

const UpdateLead = async (req: Request, res: Response): Promise<Response> => {
  const {
    companyName,
    status,
    industry,
    source,
    phone,
    email,
    website,
    description,
  } = req.body;

  const { id } = req.params;

  const userId = parseInt(req.cookies.userId || "", 10);

  if (!userId) {
    return res.status(400).json({
      status: "failed",
      message: "User ID is required.",
    });
  }

  if (!id) {
    return res.status(400).json({
      status: "failed",
      message: "Lead ID is required.",
    });
  }

  if (status && !validStatuses.includes(status)) {
    return res.status(400).json({
      status: "failed",
      message: "Invalid status value provided.",
    });
  }

  try {
    // Fetch the user and their organization
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { organization: true },
    });

    // Ensure the user is part of an organization
    if (!user || !user.organization) {
      return res.status(403).json({
        status: "failed",
        message: "You must be part of an organization to update a lead.",
      });
    }

    // Check if the lead belongs to the user's organization
    const existingLead = await prisma.lead.findFirst({
      where: {
        id: parseInt(id),
        organizationId: user.organization.id, // Ensure the lead belongs to the user's organization
      },
    });

    if (!existingLead) {
      return res.status(404).json({
        status: "failed",
        message: "Lead not found or does not belong to your organization.",
      });
    }

    const updateData: any = {
      companyName: companyName || existingLead.companyName,
      status: status || existingLead.status,
      industry: industry || existingLead.industry,
      source: source || existingLead.source,
      phone: phone || existingLead.phone,
      email: email || existingLead.email,
      website: website || existingLead.website,
      description: description || existingLead.description,
    };

    // Update the lead data
    const updatedLead = await prisma.lead.update({
      where: { id: parseInt(id) },
      data: updateData,
    });

    return res.status(200).json({
      status: "success",
      message: "Lead updated successfully.",
      data: updatedLead,
    });
  } catch (error) {
    logger.error("Lead update error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Server error. Please try again later.",
    });
  }
};

export default UpdateLead;
