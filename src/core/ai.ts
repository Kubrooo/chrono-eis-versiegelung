import { GoogleGenerativeAI  } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export const generateCommitMessage = async (diff: string) => {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash"})

    const prompt = `Kamu adalah pakar Git. Tugasmu adalah menulis pesan commit berdasarkan perubahan kode (git diff) berikut.
    Gunakan format Conventional Commits (feat:, fix:, chore:, docs:, style:, refactor:, perf:, test:).
    Tuliskan HANYA pesan commit-nya saja dalam satu baris, tanpa penjelasan tambahan.

    Diff:
    ${diff}
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text().trim();
}