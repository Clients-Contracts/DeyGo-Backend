import express from "express"
import { getProfile, resetPassword, updateProfile } from "./user.controller";

const router = express.Router();

// Profile Management Routes
router.get('/profile/:id', getProfile);
router.put('/profile/:id', updateProfile);

//reset password
router.patch('/reset-password', resetPassword)

export default router