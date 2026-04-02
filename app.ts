import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db";
import { userRouter } from "./src/routes/userRoute";
import { chatRouter } from "./src/routes/chatRoute";

dotenv.config();

const app = express();

//Connect DB
connectDB();
//Middleware
app.use(express.json());

//Route
app.use("/user", userRouter);
app.use("/chat", chatRouter);

//Server start
const PORT = process.env.PORt || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
