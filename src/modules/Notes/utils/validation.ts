import Joi from "joi";

export const notesCategoryValidation = Joi.object({
  company: Joi.any().required().allow(null).messages({
    "any.required": "Organisation is required",
    "string.empty": "Organisation is required",
  }),

  thumbnail: Joi.string().trim(),

  title: Joi.string().trim().required().min(2).max(180).messages({
    "string.min": "Title should be at least 2 characters",
    "string.max": "Title should be at most 180 characters",
    "any.required": "Title is required",
  }),

  description: Joi.string().trim().required().min(10).max(220).messages({
    "string.min": "Description should be at least 10 characters",
    "string.max": "Description should be at most 220 characters",
    "any.required": "Description is required",
  }),

  details: Joi.string().trim(),

  discountPrice: Joi.string()
    .trim()
    .max(10)
    .message("Discount price should be at most 10 characters"),

    originalPrice: Joi.string()
    .trim()
    .max(10)
    .message("Original price should be at most 10 characters"),

    rating: Joi.string()
    .trim()
    .max(5)
    .message("Rating should be at most 5 characters"),

  createdBy: Joi.string().required(),

  amountType: Joi.string()
    .trim()
    .max(10)
    .message("Amount type should be at most 10 characters"),
  pricingType: Joi.string().valid("paid", "free").default("free"),

}).options({ abortEarly: false });

export const notesCreateValidation = Joi.object({
  company: Joi.any().required().allow(null).messages({
    "any.required": "Organisation is required",
    "string.empty": "Organisation is required",
  }),

  category : Joi.any().required().allow(null).messages({
    "any.required": "Category is required",
    "string.empty": "Category is required",
  }),

  thumbnail: Joi.string().trim(),

  pdf: Joi.string().trim(),

  title: Joi.string().trim().required().min(2).max(180).messages({
    "string.min": "Title should be at least 2 characters",
    "string.max": "Title should be at most 180 characters",
    "any.required": "Title is required",
  }),

  description: Joi.string().trim().required().min(10).max(420).messages({
    "string.min": "Description should be at least 10 characters",
    "string.max": "Description should be at most 220 characters",
    "any.required": "Description is required",
  }),

  details: Joi.string().trim(),

  discountPrice: Joi.string()
    .trim()
    .max(10)
    .message("Discount price should be at most 10 characters"),

  originalPrice: Joi.string()
    .trim()
    .max(10)
    .message("Original price should be at most 10 characters"),

  rating: Joi.string()
    .trim()
    .max(5)
    .message("Rating should be at most 5 characters"),

  createdBy: Joi.string().required(),

  amountType: Joi.string()
    .trim()
    .max(10)
    .message("Amount type should be at most 10 characters"),

  pricingType: Joi.string().valid("paid", "free").default("free"),

}).options({ abortEarly: false });
