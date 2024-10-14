import { Request, Response } from "express";
import bcrypt from "bcrypt";
import prisma from "../../prisma/prismaClient";
import { SALT } from "../../constants";

const RegisterUser = async (req: Request, res: Response): Promise<Response> => {
  const { firstName, lastName, email, password, avatar, address, phoneNumber } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({
      status: "failed",
      message: "First name, last name, email, and password are required.",
    });
  }

  try {
    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      if (existingUser.authProviders.includes("LOCAL")) {
        return res.status(400).json({
          status: "failed",
          message: "Email already registered with local credentials.",
        });
      }
      if (!existingUser.password && password) {
        const hashedPassword = await bcrypt.hash(password, Number(SALT));

        await prisma.user.update({
          where: { email },
          data: {
            password: hashedPassword,
            authProviders: {
              push: "LOCAL",
            },
          },
        });

        return res.status(200).json({
          status: "success",
          message: "Account updated with local credentials.",
        });
      }
      return res.status(400).json({
        status: "failed",
        message: "User already exists with the given email.",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, Number(SALT));

    // Check if default role exists, and if not, create it
    let defaultRole = await prisma.role.findUnique({
      where: { roleName: "USER" },
    });

    if (!defaultRole) {
      // If default role doesn't exist, create it
      defaultRole = await prisma.role.create({
        data: {
          roleName: "USER",
          description: "Default role assigned to new users",
        },
      });
    }

    // Create new user
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

    // Assign the default role to the user
    await prisma.userRole.create({
      data: {
        userId: newUser.id,
        roleId: defaultRole.id,
      },
    });

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

  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Server error. Please try again later.",
    });
  }
};

export default RegisterUser;
