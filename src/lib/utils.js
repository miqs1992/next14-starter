import mongoose from "mongoose";

let connection = {};
export const connectToDb = async () => {
	if (connection.isConnected) {
		return;
	}

	try {
		const db = await mongoose.connect(process.env.MONGO);
		connection.isConnected = db.connections[0].readyState;
	} catch (error) {
		console.log(error);
		throw error;
	}
}
