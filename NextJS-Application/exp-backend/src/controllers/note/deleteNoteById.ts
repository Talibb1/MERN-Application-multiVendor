import { Request, Response } from "express";
import prisma from "../../prisma/prismaClient";

const DeleteNoteById = async (req: Request, res: Response): Promise<Response> => {
  const noteId = parseInt(req.params.id, 10);
  
  if (!noteId || isNaN(noteId)) {
    return res.status(400).json({
      status: "failed",
      message: "Valid Note ID is required.",
    });
  }

  try {
    const existingNote = await prisma.note.findUnique({
      where: { id: noteId },
    });

    if (!existingNote) {
      return res.status(404).json({
        status: "failed",
        message: "Note not found.",
      });
    }
    await prisma.note.delete({
      where: { id: noteId },
    });

    return res.status(200).json({
      status: "success",
      message: "Note deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting note:", error);
    return res.status(500).json({
      status: "failed",
      message: "Server error. Please try again later.",
    });
  }
};

export default DeleteNoteById;
