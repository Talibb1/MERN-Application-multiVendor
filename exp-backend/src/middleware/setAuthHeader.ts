// import { Request, Response, NextFunction } from 'express';
// import isTokenExpired from '../utils/refreshAccessToken/isTokenExpired';

// const setAuthHeader = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const accessToken = req.cookies.accessToken;
//     if (accessToken && !isTokenExpired(accessToken)) {
//       req.headers['authorization'] = `Bearer ${accessToken}`;
//     }
//     next();
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

// export default setAuthHeader;
