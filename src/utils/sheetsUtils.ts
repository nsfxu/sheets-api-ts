import { readSheet } from "../services/sheetsServices";

interface sheetObj {
  [key: string]: any;
}

const getRangeFromLength = (length: number) => {
  if (length <= 26) {
    return String.fromCharCode(64 + length);
  }

  let result = "";
  let dividend = length;

  while (dividend > 0) {
    let remainder = (dividend - 1) % 26;
    let letter = String.fromCharCode(65 + remainder);
    result = letter + result;
    dividend = Math.floor((dividend - 1) / 26);
  }

  return result;
};

const convertSheetsDataIntoArrayOfObjects = async (
  sheetHeaders: Array<string>,
  sheetsData: Array<Array<string>>
): Promise<any[] | null | undefined> => {
  let resultado: any[] = [];

  try {
    await Promise.all(
      sheetsData.map(async (rowValue) => {
        let thisObj = {} as sheetObj;

        sheetHeaders.forEach((prop: keyof sheetObj, index: number) => {
          if (prop) {
            thisObj[prop] = rowValue[index];
          }
        });

        resultado.push(thisObj);
      })
    );

    return resultado;
  } catch (e: any) {
    console.log(e.message);
    return null;
  }
};

const getSheetsHeaders = async (
  spreadsheetId: string
): Promise<any[][] | null | undefined> => {
  try {
    let range: string = "1:1";

    const data = await readSheet(spreadsheetId, range);

    return data;
  } catch (error) {
    return null;
  }
};

export {
  getRangeFromLength,
  convertSheetsDataIntoArrayOfObjects,
  getSheetsHeaders,
};
