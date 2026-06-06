import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

const serviceAccountAuth = new JWT({
  email: process.env.CLIENT_EMAIL,
  key: process.env.PRIVATE_KEY?.replace(/\\n/g, "\n"),
  scopes: [
    "https://www.googleapis.com/auth/spreadsheets",
  ],
});

console.log(
  "PRIVATE_KEY length:",
  process.env.PRIVATE_KEY?.length
);

console.log(
  "PRIVATE_KEY starts with:",
  process.env.PRIVATE_KEY?.substring(0, 30)
);

const doc = new GoogleSpreadsheet(
  process.env.SHEET_ID!,
  serviceAccountAuth
);

console.log("SHEET_ID:", process.env.SHEET_ID);
console.log("CLIENT_EMAIL:", process.env.CLIENT_EMAIL);

export async function getInventoryData() {

  await doc.loadInfo();

  const sheet =
    doc.sheetsByTitle["Inventory"];

  const rows =
    await sheet.getRows();

  return rows
  .slice(0, 20)
  .map(row => row.toObject());
}

export async function getFinanceData() {

  await doc.loadInfo();
  const sheet = doc.sheetsByTitle["Finance"];

const rows = await sheet.getRows();

return rows
  .slice(0, 20)
  .map(row => row.toObject());
}

export async function getLeadData() {

  await doc.loadInfo();
  const sheet =
    doc.sheetsByTitle["Leads"];

  const rows = await sheet.getRows();

return rows
  .slice(0, 20)
  .map(row => row.toObject());
}