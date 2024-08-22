import { Router } from "express";
import { getAllData } from "../controllers/sheetsController";

const router = Router();

router.post("/getAll", getAllData);

export default router;
