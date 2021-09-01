import express from "express";
import authCtr from "../controllers/authController";

const router = express.Router();

router.post('/register', authCtr.registerUser);
router.post('/activate', authCtr.activateAccount);

export default router;
