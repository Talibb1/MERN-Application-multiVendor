import { Request, Response } from "express";
import prisma from "../../prisma/prismaClient";

const GetLeadById = async (req: Request, res: Response): Promise<Response> => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({
      status: "failed",
      message: "Invalid lead ID.",
    });
  }

  try {
    const lead = await prisma.lead.findUnique({
      where: { id },
      include: {
        contacts: true,
      },
    });

    if (!lead) {
      return res.status(404).json({
        status: "failed",
        message: "Lead not found.",
      });
    }

    return res.status(200).json({
      status: "success",
      data: lead,
    });
  } catch (error) {
    console.error("Error fetching lead:", error);
    return res.status(500).json({
      status: "failed",
      message: "Server error. Please try again later.",
    });
  }
};

export default GetLeadById;
