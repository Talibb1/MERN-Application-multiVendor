import { Request, Response } from "express";
import prisma from "../../prisma/prismaClient";

const CreateNotes = async (req: Request, res: Response): Promise<Response> => {
  const { notes, leadId } = req.body;
  
  if (!notes || !leadId) {
    return res.status(400).json({ message: 'Notes content and Lead ID are required' });
  }

  try {
    // Check if the lead exists
    const existingLead = await prisma.lead.findUnique({
      where: { id: leadId },
    });

    if (!existingLead) {
      return res.status(404).json({
        status: "failed",
        message: "Lead not found. Cannot create notes.",
      });
    }
    const createdNotes = await prisma.note.create({
      data: {
        content: notes,
        leadId: Number(leadId),
        createdAt: new Date(),
      },
    });

    return res.status(201).json({
      status: "success",
      message: `Notes created successfully.`,
    });
  } catch (error) {
    console.error("Note creation error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Server error. Please try again later.",
    });
  }
};

export default CreateNotes;
