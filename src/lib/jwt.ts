// src/lib/jwt.ts
import jwt, { Secret } from "jsonwebtoken";

const JWT_SECRET: Secret = process.env.JWT_SECRET || "";

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

export interface JwtPayload {
  userId: string;
  email: string;
}

export function signToken(payload: JwtPayload, expiresIn: number = 60 * 60 * 24 * 7) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn, algorithm: 'HS256' });
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
}
