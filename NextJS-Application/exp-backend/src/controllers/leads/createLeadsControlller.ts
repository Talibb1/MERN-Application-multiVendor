import { Request, Response } from "express";
import prisma from "../../prisma/prismaClient";

const CreateLead = async (req: Request, res: Response): Promise<Response> => {
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
  } = req.body;

  // Extract userId from cookies and ensure it's valid
  const userId = parseInt(req.cookies.userId || "", 10);
  if (!companyName || !contactName || isNaN(userId)) {
    return res.status(400).json({
      status: "failed",
      message: "Company name, contact name, and valid user ID are required.",
    });
  }

  try {
    // Check if the lead with the same companyName already exists
    const existingLead = await prisma.lead.findFirst({
      where: { companyName },
    });

    if (existingLead) {
      return res.status(400).json({
        status: "failed",
        message: "Lead already exists.",
      });
    }

    // Create the new lead
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
      },
    });
    const existingContact = await prisma.contact.findFirst({
      where: {
        contactName,
        leadId: newLead.id,
      },
    });

    if (existingContact) {
      return res.status(400).json({
        status: "failed",
        message: `Contact with the name "${contactName}" already exists for this lead.`,
      });
    }

    // Create the new contact
    const newContact = await prisma.contact.create({
      data: {
        contactName,
        leadId: newLead.id,
      },
    });

    // Return success response
    return res.status(201).json({
      status: "success",
      message: "Lead and contact created successfully.",
      data: { lead: newLead, contact: newContact },
    });

  } catch (error) {
    console.error("Lead creation error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Server error. Please try again later.",
    });
  }
};

export default CreateLead;
