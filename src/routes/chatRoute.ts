import express from "express";
import { sendMessage, getHistory } from "../controllers/chatController";
import { authenticateMiddleware } from "../middleware/auth";

const chatRouter = express.Router();

chatRouter.post("/", authenticateMiddleware, sendMessage);
chatRouter.get("/history", authenticateMiddleware, getHistory);

export { chatRouter };
