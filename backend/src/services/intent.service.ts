import { askLLM } from "./llm.service";

export async function detectIntent(
  question: string
) {

  const prompt = `
You are an intent classifier.

Return ONLY ONE WORD:

lead
inventory
finance
pitch
general

Question:
${question}
`;

  const response =
    await askLLM(prompt);

  return response.trim().toLowerCase();
}