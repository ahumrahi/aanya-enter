import { leadTool }
from "./lead.tool";

import { inventoryTool }
from "./inventory.tool";

import { searchInternet }
from "../services/search.service";

export async function pitchTool(
 customerName:string
){

 const leads =
  await leadTool();

 const customer =
  leads.find(
   l =>
   l.customer
    .toLowerCase()
    .includes(
      customerName.toLowerCase()
    )
 );

 if (!customer?.vehicle) {
  return {
    error: "Vehicle information not available"
  };
}

 const marketData =
  await searchInternet(
   customer.vehicle
  );

 return {
   customer,
   marketData
 };
}