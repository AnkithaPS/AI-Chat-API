import jwt from "jsonwebtoken";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

//Register Customer
const registerUser = async (req: any, res: any) => {
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
    res.status(500).json({ message: `Failed to register: ${error}` });
  }
};

//Login user
const loginUser = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;
    //check if user exists or not
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res.status(400).json({ error: "User not found" });
    }
    //check password
    const verifyPass = await bcrypt.compare(password, existingUser.password);
    if (!verifyPass) {
      return res.status(400).json({ error: "Wrong password!" });
    }
    //token generation
    const token = jwt.sign({ id: req.user }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: `Failed to login: ${error}` });
  }
};

export { registerUser, loginUser };
