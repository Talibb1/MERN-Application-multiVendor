import { Request, Response, NextFunction } from "express";
import isTokenExpired from "../utils/RefreshAccessToken/isTokenExpired";
import refreshAccessToken from "../utils/RefreshAccessToken/refreshAccessToken";
import setTokensCookies from "../utils/GenerateToken/setTokenCookies";

interface RefreshTokenResponse {
  newAccessToken: string;
  newRefreshToken: string;
  newAccessTokenExp: number;
  newRefreshTokenExp: number;
  userId: number;
}

const accessTokenAutoRefresh = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const accessToken = req.cookies.accessToken;
    if (accessToken && !isTokenExpired(accessToken)) {
      req.headers["authorization"] = `Bearer ${accessToken}`;
    } else {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        res.status(401).json({
          status: "failed",
          message: "Refresh token is missing",
        });
        return;
      }
      const {
        newAccessToken,
        newRefreshToken,
        newAccessTokenExp,
        newRefreshTokenExp,
        userId,
      }: RefreshTokenResponse = await refreshAccessToken(req, res);
      setTokensCookies(
        res,
        newAccessToken,
        newRefreshToken,
        newAccessTokenExp,
        newRefreshTokenExp,
        userId
      );
      req.headers["authorization"] = `Bearer ${newAccessToken}`;
    }

    next();
  } catch (error: any) {
    console.error("Error in accessTokenAutoRefresh middleware:", error.message);
    res.status(401).json({
      status: "failed",
      message: "Unauthorized access or token refresh failed",
    });
    return;
  }
};

export default accessTokenAutoRefresh;