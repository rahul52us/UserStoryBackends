import { NextFunction, Response } from "express";
import Project from "../../schemas/Project";
import { ProjectCreateValidation } from "./utils/validation";
import { generateError } from "../config/function";

const createProject = async (req: any, res: Response, next: NextFunction) => {
  try {
    const result = ProjectCreateValidation.validate(req.body);
    if (result.error) {
      throw generateError(result.error.details, 422);
    }
    if (req.bodyData.role !== "admin") {
      throw generateError("cannot create the project", 400);
    }
    const projects = await Project.findOne({
      project_name: req.body.project_name.trim(),
      company: req.bodyData.company,
    });
    if (projects) {
      throw generateError(
        `${req.body.project_name} project name is already exists`,
        400
      );
    }

    const instance = new Project({
      project_name: req.body.project_name?.trim(),
      createdBy:req.bodyData._id,
      subtitle: req.body.subtitle,
      description: req.body.description,
      company: req.bodyData.company,
      logo: req.body.logo,
      project_manager: req.body.project_manager,
      status: req.body.status,
      priority: req.body.priority,
      customers: req.body.customers,
      team_members: req.body.team_members,
      due_date: req.body.due_date,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      followers: req.body.followers,
      attach_files: req.body.attach_files,
    });
    const savedProject = await instance.save();

    if (!savedProject) {
      throw generateError("cannot create the project", 400);
    }

    res.status(201).send({
      message: `${req.body.project_name} project has been created successfully`,
      data: savedProject,
      success: true,
      statusCode: 201,
    });
  } catch (err: any) {
    next(err);
  }
};

const getProject = async (req: any, res: Response, next: NextFunction) => {
  try {
    const project = await Project.findOne({
      company: req.bodyData.company,
      project_name: req.query.project_name,
    });
    if (!project) {
      throw generateError(`${req.query.project_name} does not exists`, 400);
    }
    res.status(200).send({
      message: "get project successfully",
      title: "get project successfully",
      statusCode: 200,
      data: project,
    });
  } catch (err) {
    next(err);
  }
};

export { createProject, getProject };
