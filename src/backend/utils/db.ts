import mongoose from "mongoose";


const connect = async () => {
	if (mongoose.connections[0].readyState) return;
	try {
		await mongoose.connect(process.env.MONGODB_URI as string);
		console.log("Mongodb connection is established successfully");
	} catch (error: any) {
		throw new Error("Error connecting Mongoose", error);
	}
};

export default connect;
