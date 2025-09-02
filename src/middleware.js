import { NextResponse } from "next/server";
import { ratelimit } from "./utils/rateLimit";

export async function middleware(request) {
  const allowedOrigins = ["http://localhost:3000/"];

  const origin = request.headers.get("origin");

  if (!allowedOrigins.includes(origin)) {
    return NextResponse.json(
      { message: "You are CORS blocked!" },
      { status: 403 }
    );
  }

  if (request.method === "POST") {
    let ip = request.ip || request.headers.get("x-forwaded-for") || "unknown";
    const { limit, remaining, reset } = await ratelimit.limit(ip);
    if (remaining === 0) {
      return NextResponse.json(
        { message: "You have reached your API limit" },
        { status: 500 }
      );
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: "/api/v1/:path",
};
