import Joi from "joi";

const customMessages = {
  "string.empty": "{#label} is required",
  "any.required": "{#label} is required",
  "string.min": "{#label} should be at least {#limit} characters",
  "string.max": "{#label} should be at most {#limit} characters",
  "number.min": "{#label} should be at least {#limit}",
  "number.max": "{#label} should be at most {#limit}",
  "array.min": "{#label} should have at least {#limit} items",
};

const subjectSchemaValidation = Joi.object({
  name: Joi.string().trim().required().messages(customMessages),
  gradingType: Joi.string()
    .valid("number", "grades")
    .required()
    .messages(customMessages),
  totalMarks: Joi.number().required().messages(customMessages),
  marks: Joi.number().required().messages(customMessages),
}).options({ abortEarly: false });

const testSchemaValidation = Joi.object({
  name: Joi.string().trim().required().messages(customMessages),
  startDate: Joi.date().required().messages(customMessages),
  endDate: Joi.date().required().messages(customMessages),
  subjects: Joi.array()
    .items(subjectSchemaValidation)
    .required()
    .messages(customMessages),
}).options({ abortEarly: false });

const semesterSchemaValidation = Joi.object({
  name: Joi.string().trim().required().messages(customMessages),
  startDate: Joi.date().required().messages(customMessages),
  endDate: Joi.date().required().messages(customMessages),
  subjects: Joi.array()
    .items(subjectSchemaValidation)
    .required()
    .min(1)
    .messages(customMessages),
  noOfTest: Joi.array().items(testSchemaValidation).messages(customMessages),
}).options({ abortEarly: false });

const examinationsDataValidation = Joi.object({
  section:Joi.string().required(),
  examinationsData: Joi.array()
    .items(
      Joi.object({
        semestersData: Joi.array()
          .items(semesterSchemaValidation)
          .min(1)
          .required()
          .messages(customMessages),
      })
    )
    .min(1)
    .required()
    .messages(customMessages),
});
export { examinationsDataValidation };
