import express from "express";
import {
  createVideo,
  createVideoCategory,
  getCategories,
  getVideos,
} from "../modules/videos/videos";
import authenticate from "../modules/config/authenticate";

const router = express.Router();

router.post("/create", authenticate, createVideo);
router.post("/category", authenticate, createVideoCategory);
router.post("/categories", authenticate, getCategories);
router.post('/videos',authenticate, getVideos)

export default router;