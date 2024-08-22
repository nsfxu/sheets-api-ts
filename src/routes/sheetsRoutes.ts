import { Router } from "express";
import {
  getAllData,
  findDataByProperty,
  insertIntoSheet,
} from "../controllers/sheetsController";

const router = Router();

router.post("/getAll", getAllData);
router.post("/find", findDataByProperty);
router.post("/insert", insertIntoSheet);
// insert Row
// update Row


export default router;
