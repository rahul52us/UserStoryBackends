import express from "express";
import { Createclass, UpdateClass, getClasses } from "../modules/Class/Class";
import authenticate from "../modules/config/authenticate";

const router = express.Router();

router.post("/", authenticate, getClasses);
router.post("/create", authenticate, Createclass);
router.put(`/update/:classId`, authenticate, UpdateClass);

export default router;
