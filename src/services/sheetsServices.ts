import { sheets } from "../config/googleSheetsConfig";

export const readSheet = async (spreadsheetId: string, range: string) => {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });
  return response.data.values;
};

export const writeSheet = async (
  spreadsheetId: string,
  range: string,
  values: any[]
) => {
  const requestBody: any = { values };

  const response = await sheets.spreadsheets.values.update({
    spreadsheetId,
    range,
    valueInputOption: "RAW",
    requestBody,
  });

  return response.data;
};
