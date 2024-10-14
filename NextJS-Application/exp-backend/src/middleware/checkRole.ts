import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma/prismaClient';
import { User } from '@prisma/client'; 

interface AuthenticatedRequest extends Request {
  user?: User; 
}

export const checkRole = (roles: string[]) => {
  return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;

      // Check if the user is authenticated
      if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' });
      }

      // Fetch user roles from the database
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { roles: true },  // Assuming 'roles' is an array of strings in the database
      });

      if (!user || !user.roles.some(role => roles.includes(role))) {
        return res.status(403).json({ message: 'Access denied' });
      }

      next();
    } catch (error) {
      return res.status(500).json({ message: 'Server error' });
    }
  };
};
