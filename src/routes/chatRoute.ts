import express from "express";
import {
  startSession,
  sendMessage,
  getHistory,
  getHistoryBySearch,
} from "../controllers/chatController";
import { authenticateMiddleware } from "../middleware/auth";

const chatRouter = express.Router();
chatRouter.get("/start-session", authenticateMiddleware, startSession);
chatRouter.post("/:sessionId", authenticateMiddleware, sendMessage);
chatRouter.get("/:sessionId/history", authenticateMiddleware, getHistory);
chatRouter.get("/history/search", authenticateMiddleware, getHistoryBySearch);

export { chatRouter };
