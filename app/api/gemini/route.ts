// /api/chatgpt/route.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

export const POST = async (request: Request) => {
  try {
    const { question } = await request.json();

    // Check if question exists
    if (!question) {
      return NextResponse.json(
        { error: "Question is required" },
        { status: 400 }
      );
    }

    // Initialize the model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Generate content
    const result = await model.generateContent(question);
    const response = await result.response;
    const text = response.text();

    // Return the AI response
    return NextResponse.json({
      reply: text,
    });
  } catch (error: any) {
    console.error("Error in Gemini API:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
};
