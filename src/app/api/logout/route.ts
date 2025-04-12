import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });

  // Invalidate the session cookie
  response.cookies.set("session", "", {
    maxAge: 0, // expires immediately
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  return response;
}
