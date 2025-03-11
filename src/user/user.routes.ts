import express from "express"
import { getProfile, login, register, updateProfile } from "./user.controller";

const router = express.Router();

// Authentication Routes
router.post('/register', register);
router.post('/login', login);

// Profile Management Routes
router.get('/profile/:id', getProfile);
router.put('/profile/:id', updateProfile);

export default router