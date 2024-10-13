"use server";
import connectDB from "@/server/config/db";
import User from "@/server/models/user.model";
import { verifyJWT } from "@/server/utils/jwt";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const token = request.cookies.get(process.env.COOKIE_NAME as string);

	if (!token) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		const payload = await verifyJWT(token.value); // Verify token and extract userId
		// console.log("get user payload:", payload);
		await connectDB();
		const userId = payload?.userId as string;
		// Convert userId to a MongoDB ObjectId
    const objectId = new mongoose.Types.ObjectId(userId);
    
		const user = await User.findById(objectId).select("-password");

		if (!user) {
			return NextResponse.json({ error: "User not found" }, { status: 404 });
		}

		return NextResponse.json({ user });
	} catch (error) {
		console.error("Error fetching user:", error);
		return NextResponse.json(
			{ error: "Failed to retrieve user information" },
			{ status: 500 }
		);
	}
}
