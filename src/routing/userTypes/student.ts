import express from 'express'
import authenticate from '../../modules/config/authenticate'
import { createStudent, getStudentById, getStudents, updateStudentProfile } from '../../modules/userTypes/student/student'

const router = express.Router()

router.post('/create',authenticate, createStudent)
router.post('/',authenticate,getStudents)
router.get('/:_id',authenticate,getStudentById)
router.put('/profile/:_id',authenticate,updateStudentProfile)
export default router;