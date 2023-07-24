import express from "express";
import authenticate from "../modules/config/authenticate";
import { createProject, getProject } from "../modules/project/project";
const router = express.Router();

router.post("/create", authenticate, createProject);
router.get('/get',authenticate,getProject)
export default router;
