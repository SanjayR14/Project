// src/backend/controllers/auth.controller.ts
import { AuthService } from "../services/auth.service";
import { verifyToken } from "../../../lib/jwt";

export const AuthController = {
  signup: async (req: Request) => {
    const { name, email, password } = await req.json();

    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    return AuthService.signup(name, email, password);
  },

  login: async (req: Request) => {
    const { email, password } = await req.json();

    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    return AuthService.login(email, password);
  },

  verify: async (req: Request) => {
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      throw new Error("Unauthorized");
    }
    const token = authHeader.split(" ")[1];
    const payload = verifyToken(token);
    const { userId } = await req.json();
    if (!userId) throw new Error("userId is required");
    return AuthService.verify(userId);
  },

  me: async (req: Request) => {
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      throw new Error("Unauthorized");
    }
    const token = authHeader.split(" ")[1];
    const payload = verifyToken(token);
    return AuthService.getMe(payload.userId);
  },
};
