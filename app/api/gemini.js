

import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini
const genAI = new GoogleGenerativeAI("API_KEY"); // Add your API key to .env
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// System prompt for multi-domain chatbot
const systemPrompt = `You are a friendly and knowledgeable assistant. 
You can answer questions about finance, sports, education, B.Tech subjects, and more. 
Use simple terms and emojis where appropriate.
Format your response using Markdown-like syntax:
- Use **bold** for important terms.
- Use - for bullet points.
- Use \n for new lines.`;

// Function to get AI response
export const getAIResponse = async (userInput) => {
  try {
    // Construct prompt with context
    const prompt = `${systemPrompt}\nUser: ${userInput}\nBot:`;

    // Generate response
    const result = await model.generateContent(prompt);
    const response = await result.response.text();

    return response;
  } catch (error) {
    console.error("Error:", error);
    return "Sorry, I couldn't process that request.";
  }
};