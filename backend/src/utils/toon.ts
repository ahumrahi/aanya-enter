export function convertToTOON(
  rows: any[]
): string {

  if (!rows.length) {
    return "";
  }

  const headers =
    Object.keys(rows[0]);

  const headerRow =
    headers.join("|");

  const dataRows =
    rows.map(row =>
      headers
        .map(
          header => row[header]
        )
        .join("|")
    );

  return [
    "@Lead",
    headerRow,
    ...dataRows
  ].join("\n");
}