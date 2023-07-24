import express from "express";
import {
  createCompany,
  filterCompany,
} from "../modules/organisation/Company";
const router = express.Router();

router.post("/create/:token", createCompany);
router.get("/search", filterCompany);
export default router;
