import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import prisma from "../../prisma/prismaClient";
import { AppError } from "../../utils/AppError";
import { SALT } from "../../constants";
import logger from "../../utils/logger";

const RegisterUser = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const { firstName, lastName, email, password, avatar, address, phoneNumber } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return next(new AppError("First name, last name, email, and password are required.", 400));
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      if (existingUser.authProviders.includes("LOCAL")) {
        return next(new AppError("Email already registered with local credentials.", 400));
      }

      if (!existingUser.password && password) {
        const hashedPassword = await bcrypt.hash(password, Number(SALT));
        await prisma.user.update({
          where: { email },
          data: { password: hashedPassword, authProviders: { push: "LOCAL" } },
        });

        return res.status(200).json({
          status: "success",
          message: "Account updated with local credentials.",
        });
      }

      return next(new AppError("User already exists with the given email.", 400));
    }

    const hashedPassword = await bcrypt.hash(password, Number(SALT));
    let defaultRole = await prisma.role.findUnique({ where: { roleName: "USER" } });

    if (!defaultRole) {
      defaultRole = await prisma.role.create({
        data: {
          roleName: "USER",
          description: "Default role assigned to new users",
        },
      });
    }

    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        avatar: avatar || null,
        address: address || null,
        phoneNumber: phoneNumber || null,
        authProviders: ["LOCAL"],
      },
    });

    await prisma.userRole.create({ data: { userId: newUser.id, roleId: defaultRole.id } });

    return res.status(201).json({
      status: "success",
      message: "User registered successfully with default role.",
      user: {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        avatar: newUser.avatar,
        address: newUser.address,
        phoneNumber: newUser.phoneNumber,
        role: defaultRole.roleName,
      },
    });

  } catch (error: any) {
    logger.error({
      message: "Registration error",
      stack: error.stack,
      method: req.method,
      url: req.originalUrl,
      ip: req.ip,
    });
    next(new AppError("Server error. Please try again later.", 500));
  }
};

export default RegisterUser;
