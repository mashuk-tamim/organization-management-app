import User from "@/backend/modules/user/user.model";
import connectDB from "@/backend/utils/db";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
	const { firstName, lastName, email, password, gender, contactNumber  } = await req.json();

	await connectDB();

	const existingUser = await User.findOne({ email });
	if (existingUser) {
		return new NextResponse("Email already exists", { status: 400 });
	}

	const hashedPassword = await bcrypt.hash(
		password,
		Number(process.env.BCRYPT_SALT_ROUND)
	);

  const newUser = new User({
    firstName,
    lastName,
		email,
    password: hashedPassword,
    gender,
    contactNumber
	});

	try {
		await newUser.save();
		return new NextResponse("User is registered successfully", { status: 200 });
  } catch (error: unknown) {
    console.log(error);
		if (error instanceof Error) {
			return new NextResponse("Error registering user: " + error.message, {
				status: 500,
			});
		} else {
			return new NextResponse("An unknown error occurred", {
				status: 500,
			});
		}
	}
};
