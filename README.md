# AI Customer Support Chat API

# Overview

AI Customer Support Chat API is a backend application that simulates a real-world customer support system powered by AI. Users can register, log in, send queries, and receive intelligent responses generated using AI. The system stores chat history and provides context-aware replies based on previous interactions.

# Key Highlights

- 🔐 Secure authentication using JWT
- 🤖 AI-powered chat responses
- 💬 Context-aware conversation handling
- 📜 Persistent chat history using MongoDB
- 🏗 Clean and scalable backend architecture

# Features

# Authentication

- User Registration with email & password
- Secure Login with JWT token
- Password hashing using bcrypt
- Protected routes using middleware

# AI Chat System

- Send messages to AI-powered support agent
- Receive intelligent, human-like responses
- Maintains conversational context using previous chats

# Chat History

- Stores all user conversations
- Retrieve complete chat history
- Uses last 5 messages for context-aware AI responses

# AI Integration

- Uses LLM API for generating responses
- Simulates real customer support agent behavior
- Context-based reply generation for better accuracy

# Tech Stack

- Backend: Node.js, Express.js
- Language: TypeScript
- Database: MongoDB (Mongoose)
- Authentication: JWT, bcrypt
- AI Integration: OpenAI API
- Runtime Tool: tsx

# Project Structure

src/
├── config/
│ └── db.ts
├── models/
│ ├── User.ts
│ └── Chat.ts
├── controllers/
│ ├── authController.ts
│ └── chatController.ts
├── routes/
│ ├── authRoutes.ts
│ └── chatRoutes.ts
├── middlewares/
│ └── auth.ts
├── services/
│ └── aiService.ts
└── app.ts

# Environment Variables

Create a `.env` file in the root directory:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
OPENAI_API_KEY=your_openai_api_key

# API Endpoints

# AUTH APIs

# Register User

POST /auth/register

Request Body:
{
"email": "user@example.com",
"password": "123456"
}

Response:
{
"\_id": "user_id",
"email": "user@example.com"
}

# Login User

POST /auth/login

Request Body:
{
"email": "user@example.com",
"password": "123456"
}

Response:
{
"token": "JWT_TOKEN"
}

# CHAT APIs

# Send Message to AI

POST /chat

Headers:
Authorization: <JWT_TOKEN>

Request Body:
{
"message": "My order is delayed"
}

Response:
{
"userId": "123",
"message": "My order is delayed",
"response": "We apologize for the delay. Please share your order ID so we can assist you.",
"createdAt": "timestamp"
}

# Get Chat History

GET /chat/history

Headers:
Authorization: <JWT_TOKEN>

Response:
[
{
"message": "My order is delayed",
"response": "We apologize for the delay...",
"createdAt": "timestamp"
}
]

# Security Implementation

- Passwords are hashed using bcrypt
- JWT is used for authentication
- Protected routes via middleware
- Environment variables used for sensitive data

# Running the Project Locally

npm install
npm run dev

# Server runs on:

http://localhost:5000

# Testing the API

Use tools like:

- Postman
- Thunder Client (VS Code)

Flow:

1. Register user
2. Login → get JWT token
3. Use token in Authorization header
4. Send chat message
5. Fetch chat history

---

# Future Enhancements

- Real-time chat using WebSockets
- Multi-language support
- Sentiment analysis for messages
- Rate limiting & API throttling
- Admin dashboard for chat monitoring

---

# Use Case

This project demonstrates how backend systems can integrate AI to automate customer support, reduce manual effort, and improve user experience with intelligent responses.

---

# Learning Outcomes

- Designed scalable REST APIs
- Implemented authentication & authorization
- Integrated AI into backend workflows
- Built context-aware systems
- Improved backend architecture skills

---

# Author

Backend Developer with 5+ years of experience specializing in Node.js, MongoDB, and modern API development.
