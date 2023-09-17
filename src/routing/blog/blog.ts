import express from 'express'
import authenticate from "../../modules/config/authenticate";
import { createBlog, createNewComment, deleteBlogById, getBlogById, getBlogs, getComments } from '../../modules/blog/blog';

const router = express.Router()

router.post('/',authenticate,createBlog)
router.post('/get',authenticate,getBlogs)
router.get('/:blogId',getBlogById)
router.delete('/:blogId',authenticate,deleteBlogById)


router.post('/comment/:blogId',authenticate,createNewComment)
router.get('/comments/:blogId',getComments)
export default router;