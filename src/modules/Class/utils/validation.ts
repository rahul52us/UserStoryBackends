import * as Joi from 'joi';

const customMessages = {
    "string.empty": "{#label} is required",
    "any.required": "{#label} is required",
    "string.min": "{#label} should be at least {#limit} characters",
    "string.max": "{#label} should be at most {#limit} characters",
    "number.min": "{#label} should be at least {#limit}",
    "number.max": "{#label} should be at most {#limit}",
    "array.min": "{#label} should have at least {#limit} items",
};

export const getClassesValidation = Joi.object({
  startYear : Joi.any().required().messages(customMessages),
  endYear: Joi.any().required().messages(customMessages)
}).options({
abortEarly : false
})