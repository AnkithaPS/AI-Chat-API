import { Chat } from "../models/Chat";
import { generateReply } from "../services/aiService";
import { v4 as uuidv4 } from "uuid";

//Session Id creation
const startSession = async (req: any, res: any) => {
  try {
    const sessionId = uuidv4();
    return res.status(200).json({
      message: "Session created",
      sessionId,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating session" });
  }
};

//Send message to openai
const sendMessage = async (req: any, res: any, next: any) => {
  try {
    const { message } = req.body;
    const { sessionId } = req.params;
    if (!sessionId) {
      return res.status(400).json({ message: "SessionId is required" });
    }
    if (!message || message.trim() === "") {
      return res.status(400).json({ message: "Message is required" });
    }
    //fetch chat history
    const history = await Chat.find({ userId: req.user.id, sessionId })
      .sort({ createdAt: -1 })
      .limit(10);
    const orderedHistory = history.reverse();
    const aiReply = (await generateReply(message, orderedHistory)) ?? "";

    const chat = await Chat.create({
      userId: req.user.id,
      response: aiReply,
      sessionId,
      message,
    });
    res.status(200).json({ message: "Chat created successfully", data: chat });
  } catch (error) {
    next(error);
  }
};

//Fetch history of chat
const getHistory = async (req: any, res: any, next: any) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const { sessionId } = req.params;
    if (!sessionId) {
      return res.status(400).json({ message: "SessionId is required" });
    }
    const chat = await Chat.find({ userId: req.user.id, sessionId })
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));
    res.status(200).json({ data: chat, sessionId });
  } catch (error) {
    next(error);
  }
};

//Fetch chat by searching message
const getHistoryBySearch = async (req: any, res: any, next: any) => {
  try {
    const { page = 1, limit = 10, q } = req.query;
    const chat = await Chat.find({
      userId: req.user.id,
      $or: [
        { message: { $regex: q, $options: "i" } },
        { response: { $regex: q, $options: "i" } },
      ],
    })
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));
    res.status(200).json({ data: chat });
  } catch (error) {
    next(error);
  }
};

export { startSession, sendMessage, getHistory, getHistoryBySearch };
