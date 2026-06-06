import { getInventoryData }
from "../services/sheets.service";

export async function inventoryTool() {

  const inventory =
    await getInventoryData();

  return {
    totalVehicles:
      inventory.length,

    inventory
  };
}