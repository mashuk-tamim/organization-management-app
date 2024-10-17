import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJWT } from "./server/utils/jwt";
// import connectDB from "./server/config/db";
// import Transaction from "./server/models/transaction.model";

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

	// const url = request.nextUrl.pathname;
	// try {
	// 	if (url.startsWith("/api/transaction")) {
	// 		// Establish MongoDB connection
	// 		await connectDB();

	// 		// Modify the request to filter out transactions where isDeleted is true
	// 		const transactions = await Transaction.find({ isDeleted: false });

	// 		return NextResponse.json(transactions);
	// 	}
	// } catch (error) {
	// 	console.log(error);
	// }
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: ["/dashboard/:path*", "/transaction/:path*", "/profile/:path*"],
};
