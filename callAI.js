import { GoogleGenerativeAI } from "@google/generative-ai";
import ollama from "ollama";

// export async function callAI({ prompt }) {
//   const res = await ollama.chat({
//     model: "gemma3", // hoặc model mà bạn chọn
//     messages: [{ role: "user", content: prompt }],
//   });

//   return res.message.content;
// }

const genAI = new GoogleGenerativeAI(`AIzaSyAFlOIVmvdS5Fp5jmE3tXt-XM9lqlyzDac`);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function callAI({ prompt }) {
  const result = await model.generateContent([prompt]);
//   console.log(result.response.text());
  return result.response.text();
}
