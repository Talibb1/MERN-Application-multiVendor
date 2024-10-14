// import { Request, Response } from 'express';
// import refreshAccessToken from '../../utils/refreshAccessToken/refreshAccessToken';
// import setTokenCookies from '../../utils/generateToken/setTokenCookies';

// const newAccessTokenController = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const {
//       newAccessToken,
//       newRefreshToken,
//       newRefreshTokenExp,
//       newAccessTokenExp,
//     } = await refreshAccessToken(req, res);

//     setTokenCookies(
//       res,
//       newAccessToken,
//       newRefreshToken,
//       newRefreshTokenExp,
//       newAccessTokenExp
//     );

//     res.status(200).json({
//       status: 'success',
//       message: 'New Token Generated',
//       access_Token: newAccessToken,
//       refresh_Token: newRefreshToken,
//       access_Token_Expiration: newAccessTokenExp,
//     });
//   } catch (error) {
//     if (!res.headersSent) {
//       // TypeScript type assertion for error
//       const errorMessage = (error as Error).message || 'Internal Server Error';
//       res.status(500).json({ message: errorMessage });
//     }
//   }
// };

// export default newAccessTokenController;
