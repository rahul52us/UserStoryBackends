import { NextFunction, Response } from "express";
import NotesCategory from "../../schemas/Notes/NotesCategory";
import {
  notesCategoryValidation,
  notesCreateValidation,
} from "./utils/validation";
import { generateError } from "../config/function";
import Notes from "../../schemas/Notes/Notes";
import { PaginationLimit } from "../config/constant";

// create the notes category
export const createCategory = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    req.body.createdBy = req.userId;
    req.body.company = req.bodyData.company;
    const result = notesCategoryValidation.validate(req.body);
    if (result.error) {
      throw generateError(result.error.details, 422);
    }
    const category = new NotesCategory(req.body);
    const savedCategory = await category.save();
    if (savedCategory) {
      res.status(201).send({
        message: `${category.title} category has been created`,
        data: category,
        statusCode: 201,
        success: true,
      });
    }
  } catch (err) {
    next(err);
  }
};

// get the categories
export const getCategories = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const pipeline: any = [
      {
        $match: { company: req.bodyData.company },
      },
      {
        $lookup: {
          from: "users",
          foreignField: "_id",
          localField: "createdBy",
          as: "createdBy",
        },
      },
      {
        $lookup: {
          from: "notes",
          localField: "_id",
          foreignField: "category",
          as: "notes",
        },
      },
      {
        $addFields: {
          createdBy: { $ifNull: [{ $arrayElemAt: ["$createdBy", 0] }, null] },
          totalChildData : { $size: "$notes" },
        },
      },
      {
        $project: {
          createdBy: {
            password: 0,
          },
          notes : 0
        },
      },
    ];

    const perPage = req.query.limit ? parseInt(req.query.limit) : PaginationLimit;
    const page = req.query.page ? parseInt(req.query.page) : 1;

    const countPipeline = [...pipeline];
    countPipeline.push({
      $count: "totalDocuments",
    });

    const [totalCountResult] = await NotesCategory.aggregate(countPipeline);
    const totalDocuments = totalCountResult ? totalCountResult.totalDocuments : 0;

    const totalPages = Math.ceil(totalDocuments / perPage);

    pipeline.push({
      $skip: (page - 1) * perPage,
    });

    pipeline.push({
      $limit: perPage,
    });

    const categories = await NotesCategory.aggregate(pipeline);

    res.status(200).send({
      message: "Get Categories successfully",
      data: {categories,totalPages},
      statusCode: 200,
      success: true,
    });

  } catch (err) {
    next(err);
  }
};


// create the new pdf
export const createNote = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    req.body.company = req.bodyData.company;
    req.body.createdBy = req.userId;
    const result = notesCreateValidation.validate(req.body);
    if (result.error) {
      throw generateError(result.error.details, 422);
    }
    const category = await NotesCategory.findById(req.body.category);
    if (!category) {
      throw generateError("category does not exists", 400);
    }

    const notes = new Notes(req.body);
    const savedNote = await notes.save();
    if (savedNote) {
      res.status(201).send({
        message: `${notes.title} notes has been created successfully`,
        data: savedNote,
        status: 201,
        success: true,
      });
    } else {
      throw generateError(`cannot add new note for now`, 400);
    }
  } catch (err) {
    next(err);
  }
};
