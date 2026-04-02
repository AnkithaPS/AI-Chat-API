import express from "express";
import { sendMessage, getHistory } from "../controllers/chatController";

const chatRouter = express.Router();

chatRouter.post("/", sendMessage);
chatRouter.get("/history", getHistory);

export { chatRouter };
