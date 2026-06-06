import { askLLM }
from "../services/llm.service";

import { detectIntent }
from "../services/intent.service";

import { routeTool }
from "./toolRouter";

export async function salesAgent(
  question:string
){

  const intent =
    await detectIntent(question);

  const toolData =
    await routeTool(intent);

  const prompt = `
Question:
${question}

Intent:
${intent}

Tool Data:
${JSON.stringify(toolData)}

Provide:

1. Analysis
2. Recommendation
3. Next Follow Up
4. Sales Action
`;

  return askLLM(prompt);
}