import express from "express";
import authCtr from "../controllers/authController";

const router = express.Router();

router.post('/register', authCtr.registerUser);

export default router;
