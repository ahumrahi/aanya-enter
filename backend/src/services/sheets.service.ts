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

  return rows.map(row => ({
    vehicle:
      row.get("Vehicle"),

    quantity:
      row.get("Quantity"),

    price:
      row.get("Price"),

    location:
      row.get("Location")
  }));
}

export async function getFinanceData() {

  const sheet =
    doc.sheetsByTitle["Finance"];

  const rows =
    await sheet.getRows();

  return rows.map(row => ({
    vehicle:
      row.get("Vehicle"),

    emi:
      row.get("EMI"),

    tenure:
      row.get("Tenure"),

    rate:
      row.get("InterestRate")
  }));
}

export async function getLeadData() {

  const sheet =
    doc.sheetsByTitle["Leads"];

  const rows =
    await sheet.getRows();

  return rows.map(row => ({
   customer:
      row.get("Customer"),

    vehicle:
      row.get("Vehicle"),

    emi:
      row.get("EMI"),

    tenure:
      row.get("Tenure"),

    rate:
      row.get("InterestRate")
  }));
}