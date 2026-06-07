import axios from "axios";

export async function askLLM(prompt: string) {

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "nvidia/nemotron-3-nano-30b-a3b:free",
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
console.log(
  "Response:",
  response.data.choices[0].message.content
);

console.log(
  "prompt_tokens:",
  response.data.usage.prompt_tokens
);

console.log(
  "completion_tokens:",
  response.data.usage.completion_tokens
);

console.log(
  "Total Token used:",
  response.data.usage.total_tokens
);
    return response.data.choices[0].message.content;
  } catch (error: any) {
    console.log("STATUS:", error.response?.status);
    console.log("DATA:", error.response?.data);
    throw error;
  }
}