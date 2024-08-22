import { sheets } from "../config/googleSheetsConfig";

const readSheet = async (spreadsheetId: string, range: string) => {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });
  return response.data.values;
};

const writeSheet = async (
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

const appendSheet = async (
  spreadsheetId: string,
  range: string,
  values: any[]
) => {
  const requestBody: any = { values };

  const response = await sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: "USER_ENTERED",
    requestBody,
    insertDataOption: "INSERT_ROWS",
    includeValuesInResponse: true
  });

  return response.data;
};

export { readSheet, writeSheet, appendSheet };
