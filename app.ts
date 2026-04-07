import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db";
import { userRouter } from "./src/routes/userRoute";
import { chatRouter } from "./src/routes/chatRoute";
import { errorHandler } from "./src/middleware/errorHanlder";
import limit from "./src/middleware/rateLimiter";

dotenv.config();

const app = express();

//Connect DB
connectDB();
//Middleware
app.use(express.json());

//rate limiter middleware
app.use(limit);

//Route
app.use("/user", userRouter);
app.use("/chat", chatRouter);

//Error handling middleware
app.use(errorHandler);

//Server start
const PORT = process.env.PORt || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
