import { GoogleGenerativeAI } from "@google/generative-ai";

const API_AI_KEY = import.meta.env.VITE_API_AI_KEY;
const genAI = new GoogleGenerativeAI(API_AI_KEY);

const getApiAIResponse = async (question) => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest"});

    const prompt = question

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
}

export default getApiAIResponse;