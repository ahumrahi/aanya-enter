import { getFinanceData }
from "../services/sheets.service";

export async function financeTool() {

  const finance =
    await getFinanceData();

  return finance;
}