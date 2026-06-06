import { leadTool }
from "../tools/lead.tool";

import { financeTool }
from "../tools/finance.tool";

import { inventoryTool }
from "../tools/inventory.tool";

export async function routeTool(
  intent:string
) {

  switch(intent){

    case "lead":
      return await leadTool();

    case "finance":
      return await financeTool();

    case "inventory":
      return await inventoryTool();

    default:
      return {};
  }
}