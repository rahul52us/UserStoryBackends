import { NextFunction, Response } from "express";
import Quiz from "../../schemas/Quiz/Quiz";
import QuizCategory from "../../schemas/Quiz/QuizCategory";
import { generateError } from "../config/function";
import {
  QuizCategoryValidation,
  quizCreateValidation,
  quizQuestionValidation,
} from "./utils/validation";
import Question from "../../schemas/Quiz/Question";
import { Answer } from "../../schemas/Quiz/Question";

export const createQuiz = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = quizCreateValidation.validate(req.body);
    if (result.error) {
      throw generateError(result.error.details[0], 422);
    }

    req.body.organisation = req.bodyData.organisation;
    req.body.createdBy = req.userId;

    let insertedCategories : any = []

    const quiz = new Quiz({
      title: req.body.title,
      description: req.body.description,
      organisation: req.body.organisation,
      createdBy: req.body.createdBy,
      class: req.body.class,
      section: req.body.section,
    });

    const savedQuiz: any = await quiz.save();

    if (req.body.categories && req.body.categories.length) {
      req.body.categories.forEach((item: any) => {
        item.organisation = req.bodyData.organisation;
        item.createdBy = req.userId;
      });

       insertedCategories = await QuizCategory.insertMany(
        req.body.categories
      );

      const categoriesIds = insertedCategories.map((item: any) => item._id);

      quiz.category.push(...categoriesIds);

      await quiz.save();
      savedQuiz.categories = insertedCategories;
    }

    res.status(201).send({
      message: "CREATE QUIZ SUCCESSFULLY",
      data: {...savedQuiz.toObject(), category :insertedCategories },
      statusCode: 201,
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

export const createQuizCategory = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = QuizCategoryValidation.validate(req.body);
    if (result.error) {
      throw generateError(result.error.details[0], 422);
    }

    const quiz = await Quiz.findById(req.body.quizId);

    if (!quiz) {
      throw generateError("This quiz does not exist", 400);
    }

    const categoriesData = req.body.categories;

    req.body.categories.forEach((item: any) => {
      item.organisation = req.bodyData.organisation;
      item.createdBy = req.userId;
    });

    const insertedCategories = await QuizCategory.insertMany(categoriesData);

    const categoriesIds = insertedCategories.map((item: any) => item._id);

    quiz.category.push(...categoriesIds);

    await quiz.save();

    res.status(200).json({
      message: "Categories added to quiz successfully",
      data: insertedCategories,
      statusCode: 200,
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

export const getQuiz = async (req: any, res: Response, next: NextFunction) => {
  try {
    const quizData = await Quiz.find()
      .sort({ createdAt: -1 })
      .populate("category")
      .populate("class")
      .populate("section")
      .populate("createdBy");
    res.status(200).json({
      message: "Categories added to quiz successfully",
      data: quizData,
      statusCode: 200,
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

export const createQuestion = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = quizQuestionValidation.validate(req.body);
    if (result.error) {
      throw generateError(result.error.details[0], 422);
    }

    const category = await QuizCategory.findById(req.body.categoryId);

    if (!category) {
      throw generateError("Category does not exists", 422);
    }

    const questionsData: any = req.body.questions;
    const insertedQuestions: any = [];

    for (const questionData of questionsData) {
      const answersData = questionData.answers;

      const question = new Question({
        organisation: req.bodyData.organisation,
        category: category._id,
        questionType: questionData.questionType,
        question: questionData.question,
        createdBy: req.userId,
      });

      const savedQuestion: any = await question.save();
      const questionWithAnswers: any = savedQuestion.toObject();

      const savedAnswers = [];

      for (const answerData of answersData) {
        const answer = new Answer({
          answerType: answerData.answerType,
          answer: answerData.answer,
          description: answerData.description,
          correct: answerData.correct,
        });
        const savedAnswer = await answer.save();
        savedAnswers.push(savedAnswer);
      }

      questionWithAnswers.answers = savedAnswers;
      savedQuestion.answers = savedAnswers.map((item) => item._id);
      await savedQuestion.save();
      insertedQuestions.push(questionWithAnswers);
    }

    return res.status(200).json({
      message: "Quiz created successfully",
      data: insertedQuestions,
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

export const getQuestionsByCategory = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const questions = await Question.find({
      category: req.params.category,
    }).populate("answers");
    res.status(200).send({
      message: "Get questions successfully",
      data: questions,
      statusCode: 200,
      success: true,
    });
  } catch (err) {
    next(err);
  }
};
