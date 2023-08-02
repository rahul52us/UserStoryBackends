import * as Joi from "joi";

const categoryItemSchema = Joi.object({
  title: Joi.string().trim().min(3).max(100).required().messages({
    "string.base": "Category title must be a string.",
    "string.empty": "Category title is required.",
    "string.min": "Category title must be at least 3 characters long.",
    "string.max": "Category title cannot be more than 100 characters long.",
    "any.required": "Category title is required.",
  }),
  thumbnail: Joi.string().trim(),
  description: Joi.string().trim(),
});

export const quizCreateValidation = Joi.object({
  title: Joi.string().trim().required().min(3).max(100).messages({
    "string.base": "Title must be a string.",
    "string.empty": "Title is required.",
    "string.min": "Title must be at least {#limit} characters long.",
    "string.max": "Title cannot be more than {#limit} characters long.",
    "any.required": "Title is required.",
  }),

  description: Joi.string().trim().required().messages({
    "string.base": "Description must be a string.",
    "string.empty": "Description is required.",
    "any.required": "Description is required.",
  }),

  class: Joi.string().required().messages({
    "string.base": "Class must be a string.",
    "string.empty": "Class is required.",
  }),

  section: Joi.string().required().messages({
    "string.base": "Section must be a string.",
    "string.empty": "section is required.",
  }),

  categories: Joi.array().items(categoryItemSchema).messages({
    "array.base": "Categories must be an array.",
    "array.min": "At least one category is required.",
    "any.required": "Categories array is required.",
  }),
});

export const QuizCategoryValidation = Joi.object({
  quizId: Joi.string().required().messages({
    "string.empty": "Quiz ID is required.",
  }),
  categories: Joi.array().items(categoryItemSchema).min(1).required().messages({
    "array.base": "Categories must be an array.",
    "array.min": "At least one category is required.",
    "any.required": "Categories array is required.",
  }),
}).options({ abortEarly: false });

const answerValidation = Joi.object({
  answerType: Joi.string().valid("text", "img", "video").required().messages({
    "any.only": "Answer type must be one of 'text', 'img', or 'video'.",
    "any.required": "Answer type is required.",
  }),
  answer: Joi.string().trim().required().messages({
    "string.empty": "Answer is required.",
  }),
  description: Joi.string().trim(),
  correct: Joi.boolean().default(false),
}).options({
  abortEarly: false,
});

const questionValidation = Joi.object({
  questionType: Joi.string().valid("text", "img", "video").default("text"),
  question: Joi.string().trim().required().messages({
    "string.empty": "Question is required.",
    "any.required": "Question is required.",
  }),
  answers: Joi.array().items(answerValidation).min(1).required().messages({
    "array.base": "Answers must be an array.",
    "array.min": "At least one answer is required.",
    "any.required": "Answers array is required.",
  }),
});

export const quizQuestionValidation = Joi.object({
  categoryId: Joi.string().trim().required().messages({
    "string.empty": "Category is required.",
    "any.required": "Category is required.",
  }),
  questions: Joi.array().items(questionValidation).required(),
}).options({
  abortEarly: false,
});
