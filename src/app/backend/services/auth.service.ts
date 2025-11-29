// src/backend/services/auth.service.ts
import { connectDB } from "../../../lib/db";
import { User } from "../../../models/User";
import bcrypt from "bcrypt";
import { signToken } from "../../../lib/jwt";

export const AuthService = {
  async signup(name: string, email: string, password: string) {
    await connectDB();

    const existing = await User.findOne({ email });
    if (existing) {
      throw new Error("User already exists");
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
    });

    return {
      userId: user.userId,
      name: user.name,
      email: user.email,
      isVerified: user.isVerified,
    };
  },

  async login(email: string, password: string) {
    await connectDB();

    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = signToken({ userId: user.userId, email: user.email });

    return {
      token,
      user: {
        userId: user.userId,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
      },
    };
  },

  async verify(userId: string) {
    await connectDB();

    const user = await User.findOneAndUpdate(
      { userId },
      { isVerified: true },
      { new: true }
    );

    if (!user) throw new Error("User not found");

    return {
      userId: user.userId,
      email: user.email,
      isVerified: user.isVerified,
    };
  },

  async getMe(userId: string) {
    await connectDB();
    const user = await User.findOne({ userId }).select("-password");
    if (!user) throw new Error("User not found");
    return user;
  },
};
