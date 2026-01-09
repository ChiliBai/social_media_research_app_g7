
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const MODEL_ID = 'gemini-3-flash-preview';

export const polishPostContent = async (text: string): Promise<string> => {
  if (!apiKey) {
    console.warn("API Key missing");
    return text;
  }
  
  try {
    const prompt = `帮我润色这段微博文案：${text}`;
    
    const response = await ai.models.generateContent({
      model: MODEL_ID,
      contents: prompt,
    });
    
    return response.text || text;
  } catch (error) {
    console.error("Gemini Polish Error:", error);
    return text;
  }
};

export const generateSmartComment = async (postContent: string): Promise<string> => {
  if (!apiKey) return "不错！";

  try {
    const prompt = `根据这段微博生成一条评论：${postContent}`;
    
    const response = await ai.models.generateContent({
      model: MODEL_ID,
      contents: prompt,
    });
    
    return response.text || "有趣！";
  } catch (error) {
    console.error("Gemini Comment Error:", error);
    return "支持！";
  }
};
