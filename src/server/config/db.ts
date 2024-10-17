import mongoose from "mongoose";

const connectDB = async () => {
	if (mongoose.connections[0].readyState) {
		return;
	}
	try {
    await mongoose.connect(process.env.MONGODB_URI as string);
		console.log("Mongodb connection is established successfully");
	} catch (error: any) {
		console.error("MongoDB connection error:", error);
		throw error;
	}
};

export default connectDB;
