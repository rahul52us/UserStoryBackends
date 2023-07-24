import express from "express";
import { MeUser, createUser, loginUser,forgotPassword, resetPassword, VerifyEmailToken, getUsersByCompany, changePassword } from "../modules/User/User";
import authenticate from "../modules/config/authenticate";
const router = express.Router();

router.post("/create", createUser);
router.post('/login', loginUser)
router.post('/me',authenticate,MeUser)
router.post('/forgot-password',forgotPassword)
router.post('/reset-password',resetPassword)
router.post('/change-password',authenticate,changePassword)
router.get('/verify-email/:token',VerifyEmailToken)
router.get('/get/users',authenticate,getUsersByCompany)

export default router;
