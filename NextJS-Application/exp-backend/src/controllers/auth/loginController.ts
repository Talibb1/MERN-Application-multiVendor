import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import prisma from '../../prisma/prismaClient';
import generateTokens from '../../utils/generateToken/generateToken';
import setTokensCookies from '../../utils/generateToken/setTokenCookies';

interface LoginRequestBody {
  email: string;
  password: string;
}
const userLogin = async (req: Request<{}, {}, LoginRequestBody>, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: 'failed',
        message: 'Email and password are required.',
      });
    }
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    });

    if (!user || !user.password) {
      return res.status(404).json({
        status: 'failed',
        message: 'Invalid email or password.',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        status: 'failed',
        message: 'Invalid email or password.',
      });
    }
    const { accessToken, refreshToken, accessTokenExp, refreshTokenExp } = await generateTokens(user);
    setTokensCookies(res, accessToken, refreshToken, accessTokenExp, refreshTokenExp, user.id);

    const roles = user.roles.map(userRole => userRole.role.roleName);

    await prisma.user.update({
      where: { id: user.id },
      data: { isActive: true },
    });
    return res.status(200).json({
      status: 'success',
      message: 'Login successful.',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        phoneNumber: user.phoneNumber,
        roles,
        isActive: true,
      },
      access_Token: accessToken,
      refresh_Token: refreshToken,
      access_Token_Expiration: accessTokenExp,
      refresh_Token_Expiration: refreshTokenExp,
    });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({
      status: 'failed',
      message: 'An error occurred while processing your request. Please try again later.',
    });
  }
};

export default userLogin;
