import { Request, Response } from "express";
import { appendSheet, readSheet } from "../services/sheetsServices";
import {
  getRangeFromLength,
  convertSheetsDataIntoArrayOfObjects,
  getSheetsHeaders,
  searchObjectByProperty,
} from "../utils/sheetsUtils";

const getAllData = async (req: Request, res: Response) => {
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

    const convertedSheetsData = await convertSheetsDataIntoArrayOfObjects(
      allHeaders[0],
      sheetsData
    );

    res.status(200).json(convertedSheetsData);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
};

const findDataByProperty = async (req: Request, res: Response) => {
  try {
    const { property, values, spreadsheetId } = req.body;

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

    let sheetsData = await readSheet(spreadsheetId, range);

    if (!sheetsData) {
      sheetsData = [[]];
    }

    const convertedSheetsData = await convertSheetsDataIntoArrayOfObjects(
      allHeaders[0],
      sheetsData
    );

    if (!property) {
      res.status(400).json({
        error: "É necessário colocar o property na requisição.",
      });

      return;
    }

    if (!values || values.length == 0 || !Array.isArray(values)) {
      res.status(400).json({
        error:
          "É necessário colocar a propriedade values e ela precisa ser um array.",
      });

      return;
    }

    const searchResult = await searchObjectByProperty(convertedSheetsData, property, values)

    if(Array.isArray(searchResult) && searchResult.length == 0){
      res.status(200).send("Nenhuma linha foi encontrada com esses valor(es).")

      return;
    }

    res.status(200).json(searchResult);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
};

const insertIntoSheet = async (req: Request, res: Response) => {
  try {
    const { spreadsheetId, values } = req.body;    

    let range: string = "A2:";

    if (!spreadsheetId) {
      res.status(400).json({
        error: "É necessário colocar o spreadsheetId na requisição.",
      });

      return;
    }

    if(!values) {
      res.status(400).json({
        error: "É necessário colocar a propriedade values na requisição.",
      });

      return;
    }

    if(Array.isArray(values)) {
      res.status(400).json({
        error: "A propriedade values precisa ser um array de arrays.",
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

    const result = await appendSheet(spreadsheetId, range, values)

    res.status(200).json(result);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
};

export { getAllData, findDataByProperty, insertIntoSheet };
