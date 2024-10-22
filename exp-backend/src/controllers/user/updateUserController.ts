import { Request, Response } from "express";
import prisma from "../../prisma/prismaClient";

const validRoles = ["Admin", "Restricted User", "Super User", "User"];

const UpdateUser = async (req: Request, res: Response): Promise<Response> => {
  const {
    firstName,
    lastName,
    email,
    avatar,
    roles, // Role IDs to assign
    address,
    phoneNumber,
  } = req.body;

  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      status: "failed",
      message: "User ID is required.",
    });
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      include: { roles: true }, // Include roles relation
    });

    if (!existingUser) {
      return res.status(404).json({
        status: "failed",
        message: "User not found.",
      });
    }

    const updateData: any = {
      firstName: firstName || existingUser.firstName,
      lastName: lastName || existingUser.lastName,
      email: email || existingUser.email,
      avatar: avatar || existingUser.avatar,
      address: address || existingUser.address,
      phoneNumber: phoneNumber || existingUser.phoneNumber,
      updatedAt: new Date(),
    };

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: updateData,
    });

    // Update roles if provided
    if (roles && roles.length > 0) {
      // Clear old roles
      await prisma.userRole.deleteMany({
        where: { userId: parseInt(id) },
      });

      // Assign new roles
      const userRolesData = roles.map((roleId: number) => ({
        userId: parseInt(id),
        roleId,
      }));

      await prisma.userRole.createMany({
        data: userRolesData,
      });
    }

    return res.status(200).json({
      status: "success",
      message: "User updated successfully.",
      data: updatedUser,
    });
  } catch (error) {
    console.error("User update error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Server error. Please try again later.",
    });
  }
};


export default UpdateUser;
