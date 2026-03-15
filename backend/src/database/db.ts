import mongoose from "mongoose";
import dotenv from 'dotenv';

const dbConnection = async () => {
    try {
        const uri = process.env.MONGO_URI;
        if (!uri) {
            throw new Error("MONGO_URI is not defined in environment variables");
        }
        await mongoose.connect(uri as string)

        console.log("MongoDB connected")
    } catch (error) {
        console.error("DB connection failed", error)
        process.exit(1)
    }
}
export default dbConnection;