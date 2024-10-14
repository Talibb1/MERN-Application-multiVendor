import { Request, Response } from "express";
import prisma from "../../prisma/prismaClient";

const DeleteLead = async (req: Request, res: Response): Promise<Response> => {
  const id = parseInt(req.params.id, 10); 
  if (isNaN(id)) {
    return res.status(400).json({
      status: "failed",
      message: "Invalid Lead ID.",
    });
  }

  try {
    const existingLead = await prisma.lead.findUnique({
      where: { id },
    });

    if (!existingLead) {
      return res.status(404).json({
        status: "failed",
        message: "Lead not found.",
      });
    }

    await prisma.lead.delete({
      where: { id },
    });

    return res.status(200).json({
      status: "success",
      message: "Lead deleted successfully.",
    });
  } catch (error) {
    console.error("Lead deletion error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Server error. Please try again later.",
    });
  }
};

export default DeleteLead;
