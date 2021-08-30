import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";

//modules
import User from "../models/userModel";
import { generateActiveToken } from "./generateToken";
import sendMail from "../config/sendMail";

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

      // //send mail
      // const url = `${CLIENT_URL}/active/${activeToken}`;

      // if (account) {
      //   await sendMail(account, url, "Verify your email");
      //   return res.json({ msg: "Success! Please check your email to complete signup." });
      // }
      
      //new user and active token
      res.status(200).json({ msg: "registered successfully", user: newUser, activeToken });
        
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
};

export default authCtr;
