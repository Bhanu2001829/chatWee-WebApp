import mongoose from "mongoose";

// Fuctionn to connect to MongoDB
export const connectDB = async () => {
    try {

        mongoose.connection.on("connected", () => console.log('Databse Connected'));

        await mongoose.connect(`${process.env.MONGODB_URI}/chatwee` )
    }
    catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1); // Exit the process with failure
    }
}
