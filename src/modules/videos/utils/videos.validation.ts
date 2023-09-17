import * as Joi from "joi";

const videoCreateCategoryValidation = Joi.object({
  organisation: Joi.any().required().allow(null).messages({
    "any.required": "Company is required",
    "string.empty": "Company is required",
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

const createVideosValidation = Joi.object({
  organisation: Joi.any().required().allow(null).messages({
    "any.required": "Company is required",
    "string.empty": "Company is required",
  }),

  category: Joi.any().required().messages({
    "any.required": "Category is required",
    "string.empty": "Category is required",
  }),

  thumbnail: Joi.string().trim(),

  createdBy: Joi.string().required(),

  details: Joi.string().trim(),

  title: Joi.string().min(2).max(120).trim().required().messages({
    "string.base": "Title is required",
    "string.empty": "Title is required",
    "string.min": "Title should be at least 2 characters",
    "string.max": "Title should not exceed 120 characters",
    "any.required": "Title is required",
  }),

  videoType: Joi.string().required().messages({
    "string.base": "Select any video type",
    "string.empty": "Select any video type",
    "any.required": "Select any video type",
  }),

  videoLink: Joi.string().min(4).max(350).trim().required().messages({
    "string.base": "Link is required",
    "string.empty": "Link is required",
    "string.min": "Link should be at least 4 characters",
    "string.max": "Link should not exceed 350 characters",
    "any.required": "Link is required",
  }),

  description: Joi.string().min(45).max(1800).trim().messages({
    "string.base": "Description is required",
    "string.empty": "Description is required",
    "string.min": "Description should be at least 45 characters",
    "string.max": "Description should not exceed 1800 characters",
  }),

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

  amountType: Joi.string()
    .trim()
    .max(10)
    .message("Amount type should be at most 10 characters"),

  pricingType: Joi.string().valid("paid", "free").default("free"),
}).options({
  abortEarly: false,
});

const getVideosValidations = Joi.object({

  organisation: Joi.any().required().allow(null).messages({
    "any.required": "Company is required",
    "string.empty": "Company is required",
  }),

  category: Joi.any().required().allow(null).messages({
    "any.required": "Company is required",
    "string.empty": "Company is required",
  }),
}).options({
  abortEarly : false
})

export { createVideosValidation, videoCreateCategoryValidation, getVideosValidations };
