import openAI from "openai";
import dotenv from "dotenv";
dotenv.config();

//configure api
const openai = new openAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateReply = async (userMessage: String, history: any[]) => {
  const formattedHistory = history
    .sort((a, b) => a.createdAt - b.createdAt) // oldest -> newest
    .flatMap((chat) => [
      {
        role: "user",
        content: chat.message,
      },
      {
        role: "assistant",
        content: chat.response,
      },
    ]);
  const messages = [
    {
      role: "system",
      content:
        "You are a helpful and professional customer support agent.Stay relevant to the current session only.",
    },
    ...formattedHistory,
    {
      role: "user",
      content: userMessage,
    },
  ];
  const response = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages,
  });
  return response.choices[0].message.content;
};

export { generateReply };
