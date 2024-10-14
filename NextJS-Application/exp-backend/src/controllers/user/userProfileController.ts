import { Request, Response } from "express";
import prisma from "../../prisma/prismaClient"; // Assuming you are using Prisma

const userProfile = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        avatar: true,
        address: true,
        phoneNumber: true,
        organizationId: true, 
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error in userProfile:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default userProfile;
