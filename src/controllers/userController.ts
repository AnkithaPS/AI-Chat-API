import jwt from "jsonwebtoken";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

//Register Customer
const registerUser = async (req: any, res: any, next: any) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email and password are required" });
    }
    //check for same email exists
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }
    //hash the password
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hashPassword,
    });
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    next(error);
  }
};

//Login user
const loginUser = async (req: any, res: any, next: any) => {
  try {
    const { email, password } = req.body;
    //check if user exists or not
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }
    //check password
    const verifyPass = await bcrypt.compare(password, existingUser.password);
    if (!verifyPass) {
      return res.status(400).json({ error: "Wrong password!" });
    }
    //token generation
    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });
    res.status(200).json({ message: "User logged in successfully!", token });
  } catch (error) {
    next(error);
  }
};

export { registerUser, loginUser };
