import { Request, Response, NextFunction } from "express";
import multer from "multer";
import * as path from "path";

const nt = path.join(path.resolve(__dirname, "../.."), "/public");

export const upload = (destination: string) =>
  multer({
    storage: multer.diskStorage({
      destination: (req: Request, file, cb) => {
        cb(null, path.join(nt, destination));
      },
      filename: (req: Request, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const fileExt = path.extname(file.originalname);
        const newFileName = file.fieldname + "-" + uniqueSuffix + fileExt;
        cb(null, newFileName);
      },
    }),
    fileFilter: (req: Request, file, cb) => {
      cb(null, true);
    },
  }).single("file");
