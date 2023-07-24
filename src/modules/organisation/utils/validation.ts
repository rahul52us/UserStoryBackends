import * as Joi from "joi";

const createValidation = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "string.min": "Name must have a minimum length of {#limit}",
    "string.max": "Name should not exceed a maximum length of {#limit}",
    "any.required": "Name is required",
  }),
  username: Joi.string().min(5).max(30).required().messages({
    "string.min": "username must have a minimum length of {#limit}",
    "string.max": "username should not exceed a maximum length of {#limit}",
    "any.required": "Username is required",
  }),
  company_name: Joi.string().min(3).max(30).required().messages({
    "string.min": "organisation name must have a minimum length of {#limit}",
    "string.max":
      "organisation name should not exceed a maximum length of {#limit}",
    "any.required": "organisation is required",
  }),
  password: Joi.string()
    .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
    .message(
      "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one digit."
    )
    .required(),
}).options({
  abortEarly : false
});

export { createValidation };
