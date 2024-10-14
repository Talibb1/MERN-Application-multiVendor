import { Request, Response } from "express";
import prisma from "../../prisma/prismaClient";

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
    const existingLead = await prisma.lead.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingLead) {
      return res.status(404).json({
        status: "failed",
        message: "Lead not found.",
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
    console.error("Lead update error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Server error. Please try again later.",
    });
  }
};

export default UpdateLead;
