import { Router } from "express";
import { ping } from "../controllers/exampleController";

const router = Router();

router.get("/ping", ping);

export default router;
