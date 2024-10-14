import { Request, Response } from "express";
import prisma from "../../prisma/prismaClient";

const GetLeads = async (req: Request, res: Response): Promise<Response> => {
  try {
    const leads = await prisma.lead.findMany({
      include: {
        contacts: true,
      },
    });
    return res.status(200).json({
      status: "success",
      data: leads,
    });
  } catch (error) {
    console.error("Error fetching leads:", error);
    return res.status(500).json({
      status: "failed",
      message: "Server error. Please try again later.",
    });
  }
};

export default GetLeads;
