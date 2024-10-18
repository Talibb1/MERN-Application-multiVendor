import { Request, Response } from "express";
import prisma from "../../prisma/prismaClient";

const CreateContact = async (req: Request, res: Response): Promise<Response> => {
  const { contactName, title, email, phone, position, contactDetails, leadId } = req.body;
  
  if (!contactName || !leadId) {
    return res.status(400).json({
      status: "failed",
      message: "Contact name and lead ID are required.",
    });
  }

  try {
    const existingLead = await prisma.lead.findUnique({
      where: { id: leadId },
    });

    if (!existingLead) {
      return res.status(404).json({
        status: "failed",
        message: "Lead not found. Cannot create contact.",
      });
    }
    const existingContact = await prisma.contact.findFirst({
      where: {
        contactName,
        leadId,
      },
    });

    if (existingContact) {
      return res.status(409).json({
        status: "failed",
        message: `Contact with the name "${contactName}" already exists for this lead.`,
      });
    }
    const newContact = await prisma.contact.create({
      data: {
        contactName,
        title: title || null,              
        email: email || null,              
        phone: phone || null,              
        position: position || null,        
        contactDetails: contactDetails || null,  
        leadId,
      },
    });

    return res.status(201).json({
      status: "success",
      message: "Contact created successfully.",
      data: newContact,
    });
  } catch (error) {
    console.error("Contact creation error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Server error. Please try again later.",
    });
  }
};

export default CreateContact;
