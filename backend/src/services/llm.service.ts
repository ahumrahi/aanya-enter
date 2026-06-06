import axios from "axios";

export async function askLLM(prompt: string) {
  console.log(
    "OPENROUTER_API_KEY:",
    process.env.OPENROUTER_API_KEY
      ? process.env.OPENROUTER_API_KEY.substring(0, 15) + "..."
      : "undefined"
  );

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    return response.data.choices[0].message.content;
  } catch (error: any) {
    console.log("STATUS:", error.response?.status);
    console.log("DATA:", error.response?.data);
    throw error;
  }
}