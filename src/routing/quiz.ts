import express from "express";
import { createQuestion, createQuiz, createQuizCategory, getQuestionsByCategory, getQuiz } from "../modules/Quiz/Quiz";
import authenticate from "../modules/config/authenticate";

const router = express();

router.post("/create", authenticate, createQuiz);
router.post("/category/create", authenticate, createQuizCategory);
router.post('/question/create',authenticate,createQuestion)
router.get("/questions/:category", getQuestionsByCategory);
router.post('/',getQuiz)

export default router;