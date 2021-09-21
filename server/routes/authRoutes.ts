import express from "express";
import authCtr from "../controllers/authController";

const router = express.Router();

router.post('/register', authCtr.registerUser);
router.post('/activate', authCtr.activateAccount);
router.post('/login', authCtr.login);
router.get('/logout', authCtr.logout);
router.get('/refresh_token', authCtr.refreshToken);
router.post('/google_login', authCtr.googleLogin);
router.post('/facebook_login', authCtr.facebookLogin);
router.post('/login_sms', authCtr.loginSMS);

export default router;
