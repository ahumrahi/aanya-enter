import { getLeadData } from "../services/sheets.service";

export async function leadTool() {

 const leads = await getLeadData();

 return leads;
}