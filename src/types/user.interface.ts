import { Document } from "mongoose";

export interface IUser extends Document {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	gender: "male" | "female";
	contactNumber: string;
	profileImg?: string;
}
