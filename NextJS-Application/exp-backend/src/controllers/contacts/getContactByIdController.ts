import { Request, Response } from "express";
import prisma from "../../prisma/prismaClient";

const GetContactById = async (req: Request, res: Response): Promise<Response> => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({
      status: "failed",
      message: "Invalid contact ID.",
    });
  }

  try {
    const contact = await prisma.contact.findUnique({
      where: { id },
    });
    if (!contact) {
      return res.status(404).json({
        status: "failed",
        message: "Contact not found.",
      });
    }
    return res.status(200).json({
      status: "success",
      data: contact,
    });
  } catch (error) {
    console.error("Error fetching contact:", error);
    return res.status(500).json({
      status: "failed",
      message: "Server error. Please try again later.",
    });
  }
};

export default GetContactById;
