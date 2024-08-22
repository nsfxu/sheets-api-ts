import { Router } from "express";
import {
  getAllData,
  findDataByProperty,
} from "../controllers/sheetsController";

const router = Router();

router.post("/getAll", getAllData);
router.post("/find", findDataByProperty);
// insert Row
// update Row


export default router;
