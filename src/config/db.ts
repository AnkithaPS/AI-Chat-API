import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

//Connect database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("Mongodb connected");
  } catch (error) {
    console.log(`mongodb connect failed:${error}`);
  }
};

export default connectDB;
