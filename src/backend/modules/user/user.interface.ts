// 1. Create an interface representing a document in MongoDB.

export interface IUser {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	gender: "male" | "female";
	contactNumber: string;
	profileImg?: string;
}