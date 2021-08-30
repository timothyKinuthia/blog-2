import mongoose from "mongoose";


interface UserI extends mongoose.Document {
    name: String,
    account: String,
    password: string,
    avatar: String,
    type: string
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
      select: false
    },
    role: {
      type: String,
      default: "subscriber"
    },
    avatar: {
      type: String,
    },
    type: {
      type: String,
      default: "normal",
    },
  },
  { timestamps: true }
);

export default mongoose.model <UserI> ("User", userSchema);
