import express from 'express'
import authenticate from "../../modules/config/authenticate";
import { createBlog, deleteBlogById, getBlogById, getBlogs } from '../../modules/blog/blog';

const router = express.Router()

router.post('/',authenticate,createBlog)
router.post('/get',authenticate,getBlogs)
router.get('/:blogId',getBlogById)
router.delete('/:blogId',authenticate,deleteBlogById)

export default router;