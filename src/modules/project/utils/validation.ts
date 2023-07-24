import * as Joi from "joi";

const ProjectCreateValidation = Joi.object({
  project_name: Joi.string().required().messages({
    "any.required": "Project name is required.",
  }),
  subtitle: Joi.string().allow("").optional(),
  description: Joi.string()
    .min(30)
    .messages({
      "string.min": "Description must have a minimum length of {#limit}",
    })
    .allow("")
    .optional(),
  logo: Joi.string().allow("").optional(),
  due_date: Joi.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .allow("")
    .optional(),
  priority: Joi.string()
    .valid("Low", "Medium", "High")
    .default("Medium")
    .messages({
      "any.only": "Priority must be one of 'Low', 'Medium', or 'High'.",
    }),
  project_manager: Joi.array().items(Joi.string()),
  start_date: Joi.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .allow("")
    .optional(),
  end_date: Joi.when(Joi.ref("start_date"), {
    is: Joi.exist(),
    then: Joi.date().min(Joi.ref("start_date")).raw().messages({
      "date.min": "End date must be greater than or equal to the start date.",
    }),
    otherwise: Joi.optional(),
  }),
  status: Joi.string()
    .valid("BackLog", "Todo", "In Progress", "Done", "Completed")
    .default("Todo"),
  customers: Joi.array().items(Joi.string()),
  followers: Joi.array().items(Joi.string()),
  team_members: Joi.array().items(Joi.string()),
  attach_files: Joi.array().optional(),
})
  .messages({
    "date.base": "{{#label}} must be a valid date.",
  })
  .options({
    abortEarly: false,
  });

export { ProjectCreateValidation };
