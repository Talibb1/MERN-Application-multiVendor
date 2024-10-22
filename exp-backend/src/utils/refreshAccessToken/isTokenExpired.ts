import jwt, { JwtPayload } from "jsonwebtoken";

const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true;
  try {
    const decodedToken = jwt.decode(token) as JwtPayload | null;
    if (!decodedToken || !decodedToken.exp) return true;
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  } catch (error) {
    return true;
  }
};

export default isTokenExpired;
