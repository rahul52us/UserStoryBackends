import { NextFunction, Response } from "express";
import { createBlogValidation } from "./utils/validation";
import { generateError } from "../config/function";
import Blog from "../../schemas/Blog/BlogSchema";
import CommentBlog from "../../schemas/Blog/BlogCommentSchema";
import mongoose from "mongoose";

const createBlog = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { error, value } = createBlogValidation.validate(req.body);

    if (error) {
      throw generateError(error.details, 422);
    }

    const createdBlog = new Blog({
      coverImage: value.coverImage,
      title: value.title,
      content: value.content,
      tags: value.tags,
      status: value.status,
      createdBy: req.userId,
      organisation: req.bodyData.organisation,
    });

    const savedBlog = await createdBlog.save();

    res.status(201).send({
      data: savedBlog,
      success: true,
      statusCode: 201,
      message: `${value.title} blog has been created successfully`,
    });
  } catch (err: any) {
    next(err);
  }
};

const getBlogs = async (req: any, res: Response, next: NextFunction) => {
  try {
    const page = req.query.page || 1;
    const perPage = 10;

    const blogs = await Blog.aggregate([
      {
        $match: { organisation: req.bodyData.organisation },
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
          from: "blogcomments",
          localField: "_id",
          foreignField: "blog",
          as: "comments",
        },
      },
      {
        $addFields: {
          createdBy: { $ifNull: [{ $arrayElemAt: ["$createdBy", 0] }, null] },
          comments: { $size: "$comments" },
          reactions: { $size: "$reactions" },
        },
      },
      {
        $project: {
          title: 1,
          coverImage: 1,
          createdAt: 1,
          tags: 1,
          createdBy: {
            name: 1,
            username: 1,
            _id: 1,
            pic: 1,
            position: 1,
            createdAt: 1,
          },
          comments: 1,
          reactions: 1, // Include the reactions count
        },
      },
      { $sort: { createdAt: -1 } },
      { $skip: (page - 1) * perPage },
      { $limit: perPage },
      {
        $facet: {
          totalCount: [
            {
              $group: {
                _id: null,
                count: { $sum: 1 },
              },
            },
          ],
          data: [{ $addFields: { page: page } }, { $project: { page: 0 } }],
        },
      },
    ]);

    const totalCount = blogs[0]?.totalCount[0]?.count || 0;
    const totalPages = Math.ceil(totalCount / perPage);

    res.status(200).send({
      message: "GET BLOGS SUCCESSFULLY",
      statusCode: 200,
      data: {
        totalPages: totalPages,
        data: blogs[0]?.data || [],
        currentPage: page,
      },
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

const deleteBlogById = async (req: any, res: Response, next: NextFunction) => {
  try {
    await Blog.findByIdAndDelete(req.params.blogId);
    res.status(200).send({
      message: "BLOG HAS BEEN DELETED SUCCESSFULLY",
      data: "BLOG HAS BEEN DELETED SUCCESSFULLY",
      statusCode: 200,
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

const getBlogById = async (req: any, res: Response, next: NextFunction) => {
  try {
    const blogId = new mongoose.Types.ObjectId(req.params.blogId);
    const blog = await Blog.aggregate([
      {
        $match: { _id: blogId },
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
        $addFields: {
          createdBy: { $ifNull: [{ $arrayElemAt: ["$createdBy", 0] }, null] },
          reactions: { $size: "$reactions" },
        },
      },
      {
        $project: {
          title: 1,
          coverImage: 1,
          content: 1,
          tags: 1,
          status: 1,
          createdAt: 1,
          createdBy: {
            name: 1,
            username: 1,
            _id: 1,
            pic: 1,
            position: 1,
            createdAt: 1,
            bio:1
          },
          reactions: 1,
        },
      },
    ]);

    if (blog.length === 0) {
      throw generateError(`BLOG DOES NOT EXISTS`, 400);
    }

    res.status(200).send({
      message: "GET BLOG SUCCESSFULLY",
      data: blog[0],
      statusCode: 200,
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

const createNewComment = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const instance = new CommentBlog({
      user: req.userId,
      organisation: req.bodyData.organisation,
      blog: req.body.blogId,
      content: req.body.content,
      parentComment: req.body.parentComment,
    });
    const savedBlog = await instance.save();
    res.status(201).send({
      message: "COMMENT CREATED SUCCESSFULLY",
      data: savedBlog,
      success: true,
      statusCode: 201,
    });
  } catch (err) {
    next(err);
  }
};

const getComments = async (req: any, res: Response, next: NextFunction) => {
  try {
    const page = req.query.page || 1;
    const pageSize = 10;
    const comments = await CommentBlog.find({ blog: req.params.blogId })
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .populate({
        path: "user",
        select: "name username",
      })
      .populate({
        path: "replies",
        populate: {
          path: "user",
          select: "name username",
        },
      });

    res.status(200).send({
      message: "GET COMMENTS SUCCESSFULLY",
      data: comments,
      statusCode: 200,
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

export {
  createBlog,
  getBlogs,
  getBlogById,
  deleteBlogById,
  createNewComment,
  getComments,
};
