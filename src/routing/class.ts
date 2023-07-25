import express from "express";
import { Createclass } from "../modules/Class/Class";
import authenticate from "../modules/config/authenticate";

const router = express.Router();

router.post("/create", authenticate, Createclass);

export default router;
