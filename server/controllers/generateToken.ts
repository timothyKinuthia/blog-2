import jwt from "jsonwebtoken";

export const generateActiveToken = async (id: string) => {
    const token = await jwt.sign({ id }, `${process.env.ACTIVE_TOKEN_SECRET}`, {
    expiresIn: "50m",
  });
  return token;
};

export const generateAccessToken = async (id: string) => {
    const token = await jwt.sign({ id }, `${process.env.ACCESS_TOKEN_SECRET}`, {
    expiresIn: "50m",
  });
  return token;
};

export const generateRefreshToken = async (id: string) => {
    const token = await jwt.sign({ id }, `${process.env.REFRESH_TOKEN_SECRET}`, {
    expiresIn: "50m",
  });
  return token;
};