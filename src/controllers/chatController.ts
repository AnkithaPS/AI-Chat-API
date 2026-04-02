import { Chat } from "../models/Chat";
import { generateReply } from "../services/aiService";

//Send message to openai
const sendMessage = async (req: any, res: any) => {
  try {
    const { message } = req.body;
    //fetch chat history
    const history = await Chat.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .limit(5);
    const aiReply = (await generateReply(message, history)) ?? "";
    const chat = await Chat.create({
      userId: req.user.id,
      response: aiReply,
      message,
    });
    res.status(200).json({ data: chat });
  } catch (error) {
    res.status(200).json({ error: `Error sending message: ${error}` });
  }
};

//Fetch history of chat
const getHistory = async (req: any, res: any) => {
  try {
    const chat = await Chat.find({ userId: req.user.id });
    res.status(200).json({ data: chat });
  } catch (error) {
    res.status(200).json({ error: `Error fetching history: ${error}` });
  }
};

export { sendMessage, getHistory };
