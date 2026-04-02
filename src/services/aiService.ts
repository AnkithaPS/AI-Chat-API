import openAI from "openai";
import dotenv from "dotenv";
dotenv.config();

//configure api
const openai = new openAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateReply = async (userMessage: String, history: any[]) => {
  const messages = [
    {
      role: "system",
      content: "You are a helpful and professional customer support agent.",
    },
    ...history.map((chat) => ({
      role: "user",
      content: chat.message,
    })),
    ...history.map((chat) => ({
      role: "assistant",
      content: chat.response,
    })),
    {
      role: "user",
      content: userMessage,
    },
  ];
  const response = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: messages,
  });
  return response.choices[0].message.content;
};

export { generateReply };
