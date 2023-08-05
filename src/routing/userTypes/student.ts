import express from 'express'
import authenticate from '../../modules/config/authenticate'
import { createStudent } from '../../modules/userTypes/student/student'

const router = express.Router()

router.post('/create',authenticate, createStudent)

export default router;