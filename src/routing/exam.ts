import express from "express";
import authenticate from "../modules/config/authenticate";
import { createExamination, getExamBySection } from "../modules/Exam/Exam";

const router = express.Router();
router.post("/create", authenticate, createExamination);
router.get('/:section',authenticate,getExamBySection)
export default router;