import { Request, Response } from "express";
import prisma from "../../prisma/prismaClient";

const GetNotesByLeadId = async (req: Request, res: Response): Promise<Response> => {
  const id = parseInt(req.params.id, 10);
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({
      status: "failed",
      message: "Valid Lead ID is required.",
    });
  }

  try {
    const existingLead = await prisma.lead.findUnique({
      where: { id: Number(id) },
      
    });
    if (!existingLead) {
      return res.status(404).json({
        status: "failed",
        message: "Lead not found.",
      });
    }

    // Fetch notes associated with the lead
    const notes = await prisma.note.findMany({
      where: { leadId: Number(id) },
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json({
      status: "success",
      data: notes,
    });
  } catch (error) {
    console.error("Error fetching notes:", error);
    return res.status(500).json({
      status: "failed",
      message: "Server error. Please try again later.",
    });
  }
};

export default GetNotesByLeadId;
