import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import prisma from '../../prisma/prismaClient';
import generateTokens from '../../utils/GenerateToken/generateToken';
import setTokensCookies from '../../utils/GenerateToken/setTokenCookies';
import { AppError } from '../../utils/AppError';
import logger from '../../utils/logger';

interface LoginRequestBody {
  email: string;
  password: string;
}

const userLogin = async (req: Request<{}, {}, LoginRequestBody>, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    // Check for required fields
    if (!email || !password) {
      return next(new AppError("Email and password are required.", 400));
    }

    // Find user with roles and organizations
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
        ownedOrganizations: true, // Include organizations owned by the user
        memberOfOrganizations: true, // Include organizations the user is a member of
      },
    });

    // Validate user and password
    if (!user || !user.password) {
      return next(new AppError("Invalid email or password.", 404));
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return next(new AppError("Invalid email or password.", 401));
    }

    // Generate tokens
    const { accessToken, refreshToken, accessTokenExp, refreshTokenExp } = await generateTokens(user);
    setTokensCookies(res, accessToken, refreshToken, accessTokenExp, refreshTokenExp, user.id);

    // Get roles
    const roles = user.roles.map(userRole => userRole.role.roleName);

    // Update user to set as active
    await prisma.user.update({
      where: { id: user.id },
      data: { isActive: true },
    });

    // Build response data
    const responseData = {
      id: user.id,
      avatar: user.avatar,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      phoneNumber: user.phoneNumber,
      organizationId: user.organizationId,
      defaultRoleId: user.defaultRoleId,
      roles,
      isActive: true,
      ownedOrganizations: user.ownedOrganizations, // Include owned organizations
      memberOfOrganizations: user.memberOfOrganizations, // Include member organizations
    };

    return res.status(200).json({
      status: 'success',
      message: 'Login successful.',
      user: responseData,
      access_Token: accessToken,
      refresh_Token: refreshToken,
      access_Token_Expiration: accessTokenExp,
      refresh_Token_Expiration: refreshTokenExp,
    });

  } catch (error: any) {
    logger.error({
      message: "Login error",
      stack: error.stack,
      method: req.method,
      url: req.originalUrl,
      ip: req.ip,
    });
    next(new AppError("An error occurred while processing your request. Please try again later.", 500));
  }
};

export default userLogin;
