import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

const serviceAccountAuth = new JWT({
  email: process.env.CLIENT_EMAIL,
  key: process.env.PRIVATE_KEY?.replace(/\\n/g, "\n"),
  scopes: [
    "https://www.googleapis.com/auth/spreadsheets",
  ],
});


const doc = new GoogleSpreadsheet(
  process.env.SHEET_ID!,
  serviceAccountAuth
);

export async function getInventoryData() {

  await doc.loadInfo();

  const sheet =
    doc.sheetsByTitle["Inventory"];

  const rows =
    await sheet.getRows();

  return rows
  .slice(0, 100000)
  .map(row => row.toObject());
}

export async function getFinanceData() {

  await doc.loadInfo();
  const sheet = doc.sheetsByTitle["Finance"];

const rows = await sheet.getRows();

return rows
  .map(row => row.toObject());
}

export async function getLeadData() {

  await doc.loadInfo();
  const sheet =
    doc.sheetsByTitle["Leads"];

  const rows = await sheet.getRows();

return rows
  .map(row => row.toObject());
}