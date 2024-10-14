import { Response } from "express";

const setTokensCookies = (
  res: Response,
  accessToken: string,
  refreshToken: string,
  newAccessTokenExp: number,
  newRefreshTokenExp: number,


  userId: number
): void => {
  const currentTimeInSeconds = Math.floor(Date.now() / 1000);
  const accessTokenMaxAge = (newAccessTokenExp - currentTimeInSeconds) * 1000;
  const refreshTokenMaxAge = (newRefreshTokenExp - currentTimeInSeconds) * 1000;

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    maxAge: accessTokenMaxAge,
    sameSite: "none",
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    maxAge: refreshTokenMaxAge,
    sameSite: "none",
  });

  res.cookie("isAuth", "true", {
    httpOnly: true,
    secure: true,
    maxAge: refreshTokenMaxAge,
    sameSite: "lax",
  });

  res.cookie("userId", userId, {
    httpOnly: true,
    secure: true,
    maxAge: refreshTokenMaxAge,
    sameSite: "lax",
  });
};

export default setTokensCookies;
