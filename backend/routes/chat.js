import express from "express";
import dotenv from "dotenv";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate } from "@langchain/core/prompts";

dotenv.config();

const router = express.Router();

const model = new ChatGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
  model: "gemini-1.5-flash", 
});

router.post("/", async (req, res) => {
  const { message, history } = req.body; 

  console.log("📨 Received message:", message);

  try {
    const prompt = ChatPromptTemplate.fromMessages([
        ["human", "{input}"]
    ]);
    const chain = prompt.pipe(model);
    const result = await chain.invoke({ input: message });

    console.log("✅ Gemini response:", result.content);

    res.json({ reply: result.content });
  } catch (error) {
    console.error("❌ Gemini error:", error.message);
    res.status(500).json({ error: "Something went wrong with Gemini." });
  }
});

export default router;