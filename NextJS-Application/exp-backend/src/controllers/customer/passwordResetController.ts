// import { Request, Response } from 'express';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import { PrismaClient } from '@prisma/client';
// import { SALT,JWT_ACCESS_KEY } from '../../constants';

// const prisma = new PrismaClient();

// interface PasswordResetRequestBody {
//   _id: number;
//   token: string;
//   Password: string;
//   ConfirmPassword: string;
// }

// const passwordResetController = async (req: Request<{}, {}, PasswordResetRequestBody>, res: Response): Promise<Response> => {
//   try {
//     const { _id, token, Password, ConfirmPassword } = req.body;

//     // Validate password and confirmation
//     if (!Password || !ConfirmPassword) {
//       return res.status(400).json({
//         status: 'failed',
//         message: 'Password and Confirm Password are required',
//       });
//     }

//     if (Password !== ConfirmPassword) {
//       return res.status(400).json({
//         status: 'failed',
//         message: 'Passwords do not match',
//       });
//     }

//     // Validate _id and token
//     if (!_id || !token) {
//       return res.status(400).json({
//         status: 'failed',
//         message: 'User ID and Token are required',
//       });
//     }

//     // Find user by ID
//     const user = await prisma.user.findUnique({
//       where: { id: _id },
//     });

//     if (!user) {
//       return res.status(404).json({
//         status: 'failed',
//         message: 'User not found',
//       });
//     }

//     // Verify token
//     const newSecret = user.id.toString() + JWT_ACCESS_KEY;
//     jwt.verify(token, newSecret);

//     // Hash the new password
//     const salt = await bcrypt.genSalt(Number(SALT));
//     const hashedPassword = await bcrypt.hash(Password, salt);

//     // Update the user's password
//     await prisma.user.update({
//       where: { id: user.id },
//       data: { password: hashedPassword },
//     });

//     return res.status(200).json({
//       status: 'success',
//       message: 'Password reset successfully',
//     });
//   } catch (error) {
//     console.error('Error resetting password:', error);
//     return res.status(500).json({
//       status: 'failed',
//       message: 'Error resetting password. Please try again later.',
//     });
//   }
// };

// export default passwordResetController;
