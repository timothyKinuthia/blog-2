import express from "express";
import authCtr from "../controllers/authController";

const router = express.Router();

router.post('/register', authCtr.registerUser);
router.post('/activate', authCtr.activateAccount);
router.post('/login', authCtr.login);
router.get('/logout', authCtr.logout);
router.get('/refresh_token', authCtr.refreshToken);

export default router;
