import { Request, Response, NextFunction } from "express";
import { promisify } from "util";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//modules
import User from "../models/userModel";
import { generateActiveToken } from "./generateToken";
import sendMail from "../config/sendMail";
import { sendSms } from "../config/sendSMS";

const CLIENT_URL = `${process.env.BASE_URL}`;

const authCtr = {
  registerUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, account, password } = req.body;
      
      //find if user already exists
      const user = await User.findOne({ account });

      if (user) {
        return res.status(400).json({ msg: "user already exist" });
      }

      //password hashing
      const passHash = await bcrypt.hash(password, 10);

      const newUser = await User.create({ name, account, password: passHash });
      
      //generate active token
      const activeToken = await generateActiveToken(newUser._id);

      const url = `${CLIENT_URL}/active/${activeToken}`;
      // //send mail

      // if (account) {
      //   await sendMail(account, url, "Verify your email");
      //   return res.json({ msg: "Success! Please check your email to complete signup." });
      // }

      if (account) {
        await sendSms(account, url, "Verify your phone number");
        res.status(200).json({ msg: "Success, Please check your phone for verification" });
      }
      
      //new user and active token
      //res.status(200).json({ msg: "registered successfully", user: newUser, activeToken });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  activateAccount: async (req: Request, res: Response) => {
    try {
      const { activationToken } = req.body;

      const decoded = await jwt.verify(activationToken, `${process.env.ACTIVE_TOKEN_SECRET}`);

      console.log(decoded);

    } catch (err) {
      res.status(200).json({msg: err.msg})
    }
  }
};

export default authCtr;
