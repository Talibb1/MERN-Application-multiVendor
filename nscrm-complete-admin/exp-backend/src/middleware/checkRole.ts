import { Request, Response, NextFunction } from "express";
import prisma from "../prisma/prismaClient";

const checkRole = (requiredRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userId = parseInt(req.cookies.userId || "", 10);
    const { organizationId } = req.body;

    console.log("userId:", userId, "organizationId:", organizationId);
    if (isNaN(userId) || !organizationId) {
      return res.status(400).json({ message: "Invalid user ID or organization ID." });
    }

    try {
      const userRole = await prisma.organizationRole.findFirst({
        where: {
          userId: userId,
          organizationId: organizationId,
        },
        select: { role: true },
      });

      if (!userRole || !requiredRoles.includes(userRole.role)) {
        return res.status(403).json({
          message: "You don't have the required permissions to perform this action.",
        });
      }

      next();
    } catch (error) {
      console.error("Error checking role:", error);
      return res.status(500).json({ message: "Server error." });
    }
  };
};

export default checkRole;
