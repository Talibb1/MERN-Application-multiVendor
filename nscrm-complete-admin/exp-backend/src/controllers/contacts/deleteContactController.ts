import { Request, Response } from "express";
import prisma from "../../prisma/prismaClient";

const DeleteContact = async (req: Request, res: Response): Promise<Response> => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({
      status: "failed",
      message: "Invalid Contact ID.",
    });
  }

  try {
    const existingContact = await prisma.contact.findUnique({
      where: { id },
    });

    if (!existingContact) {
      return res.status(404).json({
        status: "failed",
        message: "Contact not found.",
      });
    }
    await prisma.contact.delete({
      where: { id },
    });
    return res.status(200).json({
      status: "success",
      message: "Contact deleted successfully.",
    });
  } catch (error) {
    console.error("Contact deletion error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Server error. Please try again later.",
    });
  }
};

export default DeleteContact;
