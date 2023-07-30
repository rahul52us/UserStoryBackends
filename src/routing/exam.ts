import express from "express";
import authenticate from "../modules/config/authenticate";
import { createExamination } from "../modules/Exam/Exam";

const router = express.Router();
router.post("/create", authenticate, createExamination);
export default router;