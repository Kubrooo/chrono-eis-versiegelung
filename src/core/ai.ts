import { GoogleGenerativeAI  } from "@google/generative-ai";
import { getPreferences } from "./config";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export const generateCommitMessage = async (diff: string) => {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash"})
    const { jiraPrefix } = await getPreferences();

    const prompt = `Analyze this git diff and write a professional commit message.
    ${jiraPrefix ? `IMPORTANT: Start the message with [${jiraPrefix}-X] where X is a placeholder for task number.` : ''}
    Use conventional commits style.

    Diff:
    ${diff}
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text().trim();
}