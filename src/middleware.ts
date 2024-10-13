import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJWT } from "./server/utils/jwt";

export async function middleware(request: NextRequest) {
	// Check for cookie
	const cookie = cookies().get(process.env.COOKIE_NAME as string);
	if (!cookie) {
		return NextResponse.redirect(new URL("/login", request.url));
	}
	const token = cookie.value;

	// Validate it
	try {
		const payload = await verifyJWT(token); // Verify token and extract userId
		console.log("middleware payload", payload);
	} catch (error: any) {
		console.log("error:", error);
		return NextResponse.redirect(new URL("/login", request.url));
	}
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: ["/dashboard/:path*", "/transaction/:path*"],
};
