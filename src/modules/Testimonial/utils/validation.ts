import * as Joi from "joi";

const testimonialCreateValidation = Joi.object({
  name: Joi.string().required().trim().min(2).max(50).messages({
    "any.required": "Name is required",
    "string.empty": "Name is required",
    "string.min": "Name must be at least {#limit} characters long",
    "string.max": "Name cannot exceed {#limit} characters",
  }),
  user: Joi.string().required().messages({
    "any.required": "User is required",
    "string.empty": "User is required",
  }),
  organisation: Joi.any().allow(null).messages({
    "any.required": "Organisation is required",
    "string.empty": "Organisation is required",
  }),
  profession: Joi.string().required().trim().min(2).max(180).messages({
    "any.required": "profession is required",
    "string.empty": "profession is required",
    "string.min": "profession must be at least {#limit} characters long",
    "string.max": "profession cannot exceed {#limit} characters",
  }),
  image: Joi.string().trim().allow("").optional(),
  description: Joi.string().required().trim().min(10).max(500).messages({
    "any.required": "Description is required",
    "string.empty": "Description is required",
    "string.min": "Description must be at least {#limit} characters long",
    "string.max": "Description cannot exceed {#limit} characters",
  }),
}).options({
  abortEarly: false,
});

export { testimonialCreateValidation };
