import { Request, Response } from "express";
import { readSheet } from "../services/sheetsServices";
import {
  getRangeFromLength,
  convertSheetsDataIntoArrayOfObjects,
  getSheetsHeaders,
} from "../utils/sheetsUtils";

export const getAllData = async (req: Request, res: Response) => {
  try {
    const { spreadsheetId } = req.body;
    let { take } = req.body;

    let range: string = "A2:";

    if (!spreadsheetId) {
      res.status(400).json({
        error: "É necessário colocar o spreadsheetId na requisição.",
      });

      return;
    }

    const allHeaders = await getSheetsHeaders(spreadsheetId);

    if (!allHeaders) {
      res.status(400).json({
        error: "A planilha precisa ter cabeçalhos.",
      });

      return;
    }

    const rangeLetter = await getRangeFromLength(allHeaders[0].length);

    range += rangeLetter;

    if (take && !isNaN(take)) {
      take++;
      range += take;
    } else {
      range += 1000;
    }

    let sheetsData = await readSheet(spreadsheetId, range);

    if (!sheetsData) {
      sheetsData = [[]];
    }

    const newObj = await convertSheetsDataIntoArrayOfObjects(
      allHeaders[0],
      sheetsData
    );

    res.status(200).json(newObj);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
};
