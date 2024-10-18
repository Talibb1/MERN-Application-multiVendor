import { Request, Response } from "express";
import prisma from "../../prisma/prismaClient";

const updateUserOrganization = async (req: Request, res: Response) => {
  const { orgId } = req.body;
  const userId = parseInt(req.cookies.userId || "", 10);

  if (!orgId || isNaN(userId)) {
    return res
      .status(400)
      .json({ message: "Organization ID or user ID is missing" });
  }
  try {
    const organization = await prisma.organization.findUnique({
      where: { id: orgId },
    });

    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }
    await prisma.user.update({
      where: { id: userId },
      data: {
        organization: {
          connect: { id: orgId },
        },
      },
    });

    res.status(200).json({ message: "Organization updated successfully" });
  } catch (error) {
    console.error("Error updating organization:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default updateUserOrganization;
