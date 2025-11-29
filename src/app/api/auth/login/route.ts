// src/app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import { AuthController } from "../../../backend/controller/auth.controller";

export async function POST(req: Request) {
  try {
    const data = await AuthController.login(req);
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}
