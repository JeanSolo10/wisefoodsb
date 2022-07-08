import jwt, { Jwt } from "jsonwebtoken";

export interface User {
  id: string;
}

// Between 15-25 minutes, check behavior after and modify accordingly.
export const generateAccessToken = (user: User) => {
  return jwt.sign(
    { userId: user.id },
    process.env.JWT_ACCESS_SECRET as string,
    {
      expiresIn: "60m",
    }
  );
};

// I choosed 24h because i prefer to make the user login again each day.
// But keep him logged in if he is using the app.

export const generateRefreshToken = (user: User, jti: unknown) => {
  return jwt.sign(
    {
      userId: user.id,
      jti,
    },
    process.env.JWT_REFRESH_SECRET as string,
    {
      expiresIn: "24h",
    }
  );
};

export const generateTokens = (user: User, jti: unknown) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user, jti);

  return {
    accessToken,
    refreshToken,
  };
};
