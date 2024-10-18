import { Request, Response } from "express";
import prisma from "../../prisma/prismaClient";

const GetContacts = async (req: Request, res: Response): Promise<Response> => {
  try {
    const contacts = await prisma.contact.findMany({
      include: {
        Lead: true,
      },
    });
    return res.status(200).json({
      status: "success",
      data: contacts,
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return res.status(500).json({
      status: "failed",
      message: "Server error. Please try again later.",
    });
  }
};

export default GetContacts;
