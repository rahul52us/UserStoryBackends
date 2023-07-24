import authenticate from "../modules/config/authenticate";
import { createTestimonail, getTestimonials } from "../modules/Testimonial/Testimonial";
import express from 'express'

const router = express.Router()
router.post('/create',authenticate,createTestimonail)
router.get(`/get`,getTestimonials)
export default router;