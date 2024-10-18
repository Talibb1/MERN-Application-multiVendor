import { Request, Response } from "express";
import prisma from "../../prisma/prismaClient";

const UpdateContact = async (req: Request, res: Response): Promise<Response> => {
  const { contactName, title, email, phone, position, contactDetails } = req.body;
  const { id } = req.params;
  if (!contactName) {
    return res.status(400).json({
      status: "failed",
      message: "Contact name is required.",
    });
  }

  try {
    const existingContact = await prisma.contact.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingContact) {
      return res.status(404).json({
        status: "failed",
        message: "Contact not found.",
      });
    }
    const updatedContact = await prisma.contact.update({
      where: { id: parseInt(id) },
      data: {
        contactName,
        title,
        email,
        phone,
        position,
        contactDetails,
      },
    });
    return res.status(200).json({
      status: "success",
      message: "Contact updated successfully.",
      data: updatedContact,
    });
  } catch (error) {
    console.error("Contact update error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Server error. Please try again later.",
    });
  }
};

export default UpdateContact;
