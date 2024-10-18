import { Request, Response, NextFunction } from "express";
import prisma from "../../prisma/prismaClient";
import { AppError } from "../../utils/AppError";
import logger from "../../utils/logger";

const CreateLead = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const {
    companyName,
    contactName,
    status = "Potential",
    industry,
    phone,
    email,
    source,
    website,
    description,
    organizationId,
  } = req.body;

  const userId = parseInt(req.cookies.userId || "", 10);
  if (!companyName || !contactName || isNaN(userId)) {
    return next(new AppError("Company name, contact name, and valid user ID are required.", 400));
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { organization: true },
    });
    if (!user || !user.organization) {
      return next(new AppError("User must be part of an organization to create a lead.", 400));
    }
    const selectedOrganizationId = organizationId || user.organization.id;

    const isPartOfOrganization = await prisma.organizationRole.findFirst({
      where: {
        organizationId: selectedOrganizationId,
        userId: userId,
      },
    });
    
    if (!isPartOfOrganization) {
      return next(new AppError("You do not belong to this organization.", 403));
    }
    const existingLead = await prisma.lead.findFirst({
      where: { companyName, organizationId: selectedOrganizationId },
    });

    if (existingLead) {
      return next(new AppError("Lead already exists for this organization.", 400));
    }
    const newLead = await prisma.lead.create({
      data: {
        companyName,
        status,
        industry,
        phone,
        email,
        source,
        website,
        description,
        userId,
        organizationId: selectedOrganizationId, 
      },
    });

    const existingContact = await prisma.contact.findFirst({
      where: { contactName, leadId: newLead.id },
    });

    if (existingContact) {
      return next(new AppError(`Contact with the name "${contactName}" already exists for this lead.`, 400));
    }

    const newContact = await prisma.contact.create({
      data: {
        contactName,
        leadId: newLead.id,
      },
    });
    return res.status(201).json({
      status: "success",
      message: "Lead and contact created successfully.",
      data: { lead: newLead, contact: newContact },
    });
  } catch (error) {
    logger.error("Lead creation error:", error);
    return next(new AppError("Server error. Please try again later.", 500));
  }
};

export default CreateLead;
