import { NextFunction, Request, Response } from "express";
import Testimonial from "../../schemas/Testimonial";
import { generateError } from "../config/function";
import { testimonialCreateValidation } from "./utils/validation";

const createTestimonail = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    req.body.company = req.bodyData.company
    req.body.user = req.userId
    const result = testimonialCreateValidation.validate(req.body);
    if (result.error) {
      throw generateError(result.error.details[0], 422);
    }
    const test = new Testimonial(req.body);
    const createdTestimonial = await test.save();
    if (!createdTestimonial) {
      throw generateError("failed to create data", 400);
    }
    return res.status(201).send({
      message: "New Testimonial has been created successfully",
      data: createdTestimonial.toObject(),
      statusCode: 201,
      success: true,
    });
  } catch (err: any) {
    next(err);
  }
};


const getTestimonials = async(req : any, res : Response , next : NextFunction) => {
  try
  {
    let query : any = {}
    let limit = req.query.limit ? req.query.limit : 2
    if(req.query.company)
    {
      query.company = req.query.company
    }
    const testimonials = await Testimonial.find(query).sort({ createdAt: -1 }).skip((req.query.page - 1) * limit).limit(limit)
    res.status(200).send({
      data : testimonials,
      message : 'Get Testimonials Successfully',
      statusCode : 200,
      success : true
    })
  }
  catch(err)
  {
    next(err)
  }
}

export {createTestimonail, getTestimonials}