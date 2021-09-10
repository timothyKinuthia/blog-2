import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//modules
import User, { UserI } from "../models/userModel";
import { generateActiveToken, generateAccessToken, generateRefreshToken } from "./generateToken";
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
  login: async(req: Request, res: Response) => {
    try {
      const { account, password } = req.body;
      
      const user = await User.findOne({ account });

      //check if user exist
      if (!user) {
        return res.status(400).json({ msg: "This user doesn't exist." });
      };

      loginUser(user, password, res);

    } catch (err) {
      res.status(500).json({ msg: "server error!" });
  }
  },
  logout: (req: Request, res: Response) => {
    try {
      res.clearCookie("refreshToken", { path: "/api/refresh_token" });
      res.json({ msg: "Logged out" });
     } catch (err) {
      res.status(500).json({ msg: "server error!" });
    }
  },
  refreshToken: async (req: Request, res: Response) => {
    try {
      const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ msg: "You are not logged in"});
      };
      
    const decoded = await <DecodedUser>jwt.verify(
      refreshToken,
      `${process.env.REFRESH_TOKEN_SECRET}`
      );

      if (!decoded) {
        return res.status(401).json({msg: "Please login"})
      }
      
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return res.status(401).json({ msg: "This user does not exist!"});
      };

      const accessToken = await generateRefreshToken(user._id);

      res.status(200).json({ msg: "success", user });
      

    } catch (err) {
      res.status(500).json({ msg: "server error!" });
    };

  }
};

const loginUser = async (user: UserI, password: string, res: Response) => {

  const isMatch = await comparePassword(user, password);

  if (!isMatch) {
    return res.status(404).json({ msg: "Invalid credentials!" });
  }
  const accessToken = await generateAccessToken(user._id);
  const refreshToken = await generateRefreshToken(user._id);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    path: "/api/refresh_token",
    maxAge: 30 * 24 * 60 * 60 * 1000
  });

  res.status(200).json({ msg: "Login success", token:accessToken, user: {...user._doc, password: ''} });

}

const comparePassword = async (user: UserI, password: string) => {
  return await bcrypt.compare(password, user.password);
};

export default authCtr;
