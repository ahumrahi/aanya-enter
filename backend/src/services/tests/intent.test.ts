import dotenv from "dotenv";
dotenv.config();

import { detectIntent }
from "../../services/intent.service";

async function runTest() {
  const question =
    "Who is the Prime Minister of India";

  const intent =
    await detectIntent(question);

  console.log(intent);
  console.log(
  "API Key:",
  process.env.OPENROUTER_API_KEY
    ? "Loaded"
    : "Missing"
);
}

runTest();