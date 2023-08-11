import * as Joi from 'joi';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const customMessages = {
    "string.empty": "{#label} is required",
    "any.required": "{#label} is required",
    "string.min": "{#label} should be at least {#limit} characters",
    "string.max": "{#label} should be at most {#limit} characters",
    "number.min": "{#label} should be at least {#limit}",
    "number.max": "{#label} should be at most {#limit}",
    "array.min": "{#label} should have at least {#limit} items",
};

export const createStudentValidation = Joi.object({
    name : Joi.string().min(5).max(80).trim().required().messages(customMessages),
    username: Joi.string().min(4).trim().required().messages(customMessages),
    pic: Joi.string().allow("").optional(),
    class:Joi.string().required().messages(customMessages),
    section:Joi.string().required().messages(customMessages),
    nickName : Joi.string().min(2).trim().messages(customMessages),
    mobileNo: Joi.string().pattern(phoneRegExp).message('please provide a valid number').required(),
    emergencyNo: Joi.string().pattern(phoneRegExp).message('please provide a valid number'),
    password : Joi.string()
      .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
      .message(
        "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one digit."
      )
      .required(),
    fatherName:Joi.string().min(5).max(80).trim().required().messages(customMessages),
    motherName:Joi.string().min(5).max(80).trim().required().messages(customMessages),
    sibling:Joi.number().messages(customMessages),
    language:Joi.array().messages(customMessages),
    addressInfo:Joi.array().min(1).required().messages(customMessages)
}).options({
  abortEarly : false
})

export const getStudentsValidation = Joi.object({
  section : Joi.string().required().messages(customMessages),
}).options({
abortEarly : false
})