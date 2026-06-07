import { askLLM }
from "../services/llm.service";

import { detectIntent }
from "../services/intent.service";

import { routeTool }
from "./toolRouter";

import { convertToTOON }
from "../utils/toon";

export async function salesAgent(
  question: string
)  

{

  const intent =
    await detectIntent(question);
    
  const toolData =
    await routeTool(intent);

  const toonData =
  Array.isArray(toolData)
    ? convertToTOON(toolData)
    : JSON.stringify(toolData);    

  let prompt = "";

  switch (intent) {

    case "lead":

      prompt = `
Question:
${question}

Lead Data (TOON Format):
${toonData}

The data is in TOON format.
Columns are separated by "|".

Provide markdown response:

If data contains multiple customers, present them in a table.
This table should have only customer having high buying probability based on remarks

Example:

| Customer | Status | Last Contact | Next Follow Up |
|----------|----------|-------------|---------------|
| Amit     | Interested | 01-Jun | 08-Jun |

After the table, provide:

# Lead Summary

# Recommended Next Action

# Follow Up Date
`;

      break;

    case "inventory":

      prompt = `
Question:
${question}

Inventory Data (TOON Format):
${toonData}

The data is in TOON format.
Columns are separated by "|".

Provide markdown response:

# Inventory Summary

# Available Vehicles

# Low Stock Alerts

# Recommended Vehicles

Do not provide customer follow up information.
`;

      break;

    case "finance":

      prompt = `
Question:
${question}

Finance Data (TOON Format):
${toonData}

The data is in TOON format.
Columns are separated by "|".

Provide markdown response:

If data contains multiple finance details, present them in a table.
The below table should create summary rather than detail for each vehicle
Example:

| Month | Vehicle | Revenue Amount| Total Margin|
|----------|----------|-------------|---------------|
| May 2025 | Nduro 2.0 | 1000000 | 300000 |

After the table, provide:

# Finance Summary

# Outstanding Amount

# Financial Recommendation

Do not provide customer follow up information.
`;

      break;

    case "followup":

      prompt = `
Question:
${question}

Customer Data:
${JSON.stringify(toolData, null, 2)}

Provide markdown response:

# Customer

# Follow Up Priority

# Reason

# Recommended Action

# Suggested Follow Up Date
`;

      break;

    case "pitch":

      prompt = `
Question:
${question}

Customer Data:
${JSON.stringify(toolData, null, 2)}

Provide markdown response:

If data contains multiple customers, present them in a table.

Example:

| Customer | Status | Last Contact | Sales Pitch |
|----------|----------|-------------|---------------|
| Amit | Interested | 01-Jun | 08-Jun |

After the table, provide:

# Customer Profile

# Vehicle Recommendation

# Key Benefits

`;

      break;

    default:

      prompt = `
Question:
${question}

Available Data:
${JSON.stringify(toolData, null, 2)}

Answer the user's question directly.

Use markdown headings and bullet points where appropriate.
`;
  }

  return askLLM(prompt);
}