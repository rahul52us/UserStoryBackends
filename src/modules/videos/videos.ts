import { NextFunction, Response } from "express";
import Videos from "../../schemas/Videos/Videos";
import { generateError } from "../config/function";
import {
  createVideosValidation,
  getVideosValidations,
  videoCreateCategoryValidation,
} from "./utils/videos.validation";
import VideosCategory from "../../schemas/Videos/VideosCategory";
import { PaginationLimit } from "../config/constant";
import mongoose from "mongoose";

const createVideoCategory = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    req.body.createdBy = req.userId;
    req.body.organisation = req.bodyData.organisation;

    const result = videoCreateCategoryValidation.validate(req.body);

    if (result.error) {
      throw generateError(result.error.details, 422);
    }

    const videoCategory = new VideosCategory(req.body);
    const savedVideoCategory = await videoCategory.save();

    if (!savedVideoCategory) {
      throw generateError("Cannot create Cateogry", 400);
    }

    res.status(201).send({
      message: `${videoCategory.title} category has been created successfully`,
      data: savedVideoCategory,
      statusCode: 201,
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

const createVideo = async (req: any, res: Response, next: NextFunction) => {
  try {
    req.body.createdBy = req.userId;
    req.body.organisation = req.bodyData.organisation;
    const result = createVideosValidation.validate(req.body);
    if (result.error) {
      throw generateError(result.error.details, 422);
    }
    const video = new Videos(req.body);
    const savedVideo = await video.save();
    if (!savedVideo) {
      throw generateError(`cannot create the video`, 400);
    }
    return res.status(200).send({
      message: `${savedVideo.title} video has been created successfully`,
      data: savedVideo,
      statusCode: 201,
      success: true,
    });
  } catch (err: any) {
    next(err);
  }
};

const getCategories = async (req: any, res: Response, next: NextFunction) => {
  try {
    const pipeline: any = [
      {
        $match: { company: req.bodyData.organisation },
      },
      {
        $sort : {
          createdAt : -1
        }
      },
      {
        $lookup: {
          from: "videos",
          localField: "_id",
          foreignField: "category",
          as: "videos",
        },
      },
      {
        $addFields: {
          videos: { $size: "$videos" },
        },
      },
    ];

    const perPage = req.query.limit
      ? parseInt(req.query.limit)
      : PaginationLimit;
    const page = req.query.page ? parseInt(req.query.page) : 1;

    const countPipeline = [...pipeline];
    countPipeline.push({
      $count: "totalDocuments",
    });

    const [totalCountResult] = await VideosCategory.aggregate(countPipeline);
    const totalDocuments = totalCountResult
      ? totalCountResult.totalDocuments
      : 0;

    const totalPages = Math.ceil(totalDocuments / perPage);

    pipeline.push({
      $skip: (page - 1) * perPage,
    });

    pipeline.push({
      $limit: perPage,
    });

    const categories = await VideosCategory.aggregate(pipeline);

    res.status(200).send({
      message: "Get Categories successfully",
      data: { categories, totalPages },
      statusCode: 200,
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

const getVideos = async (req: any, res: Response, next: NextFunction) => {
  try {
    const pipeline: any = [
      {
        $match: {
          company: new mongoose.Types.ObjectId(req.bodyData.organisation),
          category: new mongoose.Types.ObjectId(req.body.category),
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ];

    const perPage = req.query.limit
      ? parseInt(req.query.limit)
      : PaginationLimit;

    const page = req.query.page ? parseInt(req.query.page) : 1;

    const countPipeline = [...pipeline];

    countPipeline.push({
      $count: "totalDocuments",
    });

    const [totalCountResult] = await Videos.aggregate(countPipeline);
    const totalDocuments = totalCountResult
      ? totalCountResult.totalDocuments
      : 0;

    const totalPages = Math.ceil(totalDocuments / perPage);

    pipeline.push({
      $skip: (page - 1) * perPage,
    });

    pipeline.push({
      $limit: perPage,
    });

    const videos = await Videos.aggregate(pipeline);

    res.status(200).send({
      message: "Get Videos successfully",
      data: { videos, totalPages },
      statusCode: 200,
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

export { createVideo, createVideoCategory, getCategories, getVideos };