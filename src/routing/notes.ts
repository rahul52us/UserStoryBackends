import express from 'express'
import {createCategory, createNote, getCategories} from "../modules/Notes/Notes";
import authenticate from '../modules/config/authenticate';

const router = express.Router()

router.post('/category',authenticate,createCategory)
router.post('/categories',authenticate,getCategories)
router.post('/create',authenticate,createNote)
export default router;