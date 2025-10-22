import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateBio = async (): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Generate a short, tech-focused bio for an engineering student persuing btech in CSE(AI ML) who loves webdev as vibe coding and is interested to learn and research in cybersecurity, written in a cool, slightly cyberpunk/hacker tone. It should be in the first person. Mention skills in crafting dynamic user interfaces, React, and integrating AI. The tone should be confident and intriguing, like a digital architect shaping the future of the web. Keep it under 90 words.`
        });
        return response.text;
    } catch (error) {
        console.error("Error generating bio:", error);
        return "Failed to generate a new bio. Please check the console for more details.";
    }
};