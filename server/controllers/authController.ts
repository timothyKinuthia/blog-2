import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//modules
import User from "../models/userModel";
import { generateActiveToken } from "./generateToken";
import sendEmail from "../config/sendMail";
import { sendSms } from "../config/sendSMS";
import { DecodedUser } from "../config/interface";
import { isValidEmail, isValidPhone } from '../middleware/validators';

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

      //validate via email
      if (isValidEmail(account)) {
        await sendEmail(account, url, "Verify your email");
        return res.json({ msg: "Success! Please check your email to complete signup." });
      //validate via phone
      } else if (isValidPhone(account)) {
        await sendSms(account, url, "Verify your phone number");
        return res.status(200).json({ msg: "Success, Please check your phone for verification" });
      } else if (!isValidEmail(account) && !isValidPhone(account)) {
        return res.status(400).json({ msg: "Invalid phone number or email!" });
      };
      
    } catch (err: any) {
      res.status(500).json({ msg: err.message });
    }
  },
  activateAccount: async (req: Request, res: Response) => {
    try {
      const { activationToken } = req.body;

      const decoded = await <DecodedUser>jwt.verify(
        activationToken,
        `${process.env.ACTIVE_TOKEN_SECRET}`
      );


      const { id } = decoded;

      const user = await User.findOne({ _id: id });

      if (!user) {
        return res.status(401).json({ msg: "Invalid authentication!" });
      }

      const newUser = await User.findOneAndUpdate({ _id: user._id }, { isActivated: true }, { new: true });

      res.status(200).json({ msg: "Account activated successfully!", user: newUser });

    } catch (err: any) {
      if (err.message === "jwt expired") {
        res.status(400).json({msg: "Your token has expired, please try again."})
      }
    }
  },
};

export default authCtr;
