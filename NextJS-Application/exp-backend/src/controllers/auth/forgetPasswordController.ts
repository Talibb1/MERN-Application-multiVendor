// import { Request, Response } from 'express';
// import { PrismaClient } from '@prisma/client';
// import jwt from 'jsonwebtoken';
// import { sendPasswordResetEmail } from '../../services/emailService'; 
// import { JWT_ACCESS_KEY } from '../../constants';

// const prisma = new PrismaClient();

// const forgetPassword = async (req: Request, res: Response): Promise<Response> => {
//   try {
//     const { email } = req.body;

//     if (!email) {
//       return res.status(400).json({
//         status: 'failed',
//         message: 'Email address is required.',
//       });
//     }

//     const user = await prisma.user.findUnique({
//       where: { email },
//     });

//     if (!user) {
//       return res.status(404).json({
//         status: 'failed',
//         message: 'No account associated with this email address.',
//       });
//     }

//     if (!user.password) {
//       return res.status(404).json({
//         status: 'failed',
//         message: 'No account associated with this email address.',
//       });
//     }

//     const secretToken = user.id.toString() + JWT_ACCESS_KEY;
//     const token = jwt.sign({ userId: user.id }, secretToken, {
//       expiresIn: '25m',
//     });

//     await sendPasswordResetEmail(email, token, user.firstName);
//     return res.status(200).json({
//       status: 'success',
//       message: 'Password reset instructions have been sent to your email.',
//     });
//   } catch (error) {
//     console.error('Error sending password reset email:', error);
//     return res.status(500).json({
//       status: 'failed',
//       message:
//         'An error occurred while processing your request. Please try again later.',
//     });
//   }
// };

// export default forgetPassword;
