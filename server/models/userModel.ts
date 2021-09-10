import mongoose from "mongoose";

export interface UserI extends mongoose.Document {
  name: string;
  account: string;
  password: string;
  avatar: string;
  type: string;
  isActivated: boolean;
  _doc: object;
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Your name is required"],
      trim: true,
      maxLength: [20, "Name should have a maximum of 20 characters"],
    },
    account: {
      type: String,
      required: [true, "Add phone or email"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
    },
    role: {
      type: String,
      default: "subscriber",
    },
    avatar: {
      type: String,
    },
    type: {
      type: String,
      default: "register",
    },
    isActivated: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true }
);

export default mongoose.model<UserI>("User", userSchema);
