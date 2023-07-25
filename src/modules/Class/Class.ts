import { NextFunction, Response } from "express";
import Class from "../../schemas/Class/Class";
import Section from "../../schemas/Class/Section";

const Createclass = async (req: any, res: Response, next: NextFunction) => {
  try {
    req.body.organisation = req.bodyData.organisation;
    req.body.createdBy = req.userId;

    const classInstance = new Class({
      name: req.body.name,
      startYear: req.body.startYear,
      endYear: req.body.endYear,
      organisation: req.body.organisation,
      createdBy: req.body.createdBy,
    });

    const savedClass = await classInstance.save();

    if (Array.isArray(req.body.sections) && req.body.sections?.length) {
      req.body.sections.forEach((item: any) => {
        item.class = savedClass._id;
        item.createdBy = req.body.createdBy;
      });

      const insertedSections = await Section.create(req.body.sections, {
        insertedIds: true,
      });

      classInstance.sections = insertedSections.map((item) => item._id);

      await classInstance.save();
      res.status(201).send({
        message: `Create ${classInstance.name} Class has been created Successfully`,
        data: { ...savedClass.toObject(), sections: insertedSections },
        statusCode: 201,
        success: true,
      });
    }
  } catch (err) {
    next(err);
  }
};

export { Createclass };
