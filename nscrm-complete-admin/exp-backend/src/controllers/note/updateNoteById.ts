import { Request, Response } from "express";
import prisma from "../../prisma/prismaClient";

const UpdateNoteById = async (req: Request, res: Response): Promise<Response> => {
  const noteId = parseInt(req.params.id, 10);
  const { content } = req.body;

  if (!noteId || isNaN(noteId)) {
    return res.status(400).json({
      status: "failed",
      message: "Valid note ID is required.",
    });
  }

  if (!content || content.trim() === "") {
    return res.status(400).json({
      status: "failed",
      message: "Note content cannot be empty.",
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

    // Update the note content
    const updatedNote = await prisma.note.update({
      where: { id: noteId },
      data: {
        content,
      },
    });

    return res.status(200).json({
      status: "success",
      message: "Note updated successfully.",
      data: updatedNote,
    });
  } catch (error) {
    console.error("Error updating note:", error);
    return res.status(500).json({
      status: "failed",
      message: "Server error. Please try again later.",
    });
  }
};

export default UpdateNoteById;
