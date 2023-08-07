import express from 'express'
import authenticate from '../../modules/config/authenticate'
import { createStudent, getStudents } from '../../modules/userTypes/student/student'

const router = express.Router()

router.post('/create',authenticate, createStudent)
router.post('/',authenticate,getStudents)

export default router;