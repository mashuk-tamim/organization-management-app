import mongoose from "mongoose";

const connectDB = async () => {
	if (mongoose.connections[0].readyState) return;
	try {
		await mongoose.connect(process.env.MONGODB_URI as string);
		console.log("Mongodb connection is established successfully");
	} catch (error: any) {
		throw new Error(
			`Error connecting Mongoose and the error message is ${error.message}`,
			error
		);
	}
};

export default connectDB;
