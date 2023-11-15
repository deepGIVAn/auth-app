import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  // if i just uses hash here so i need to define the await in front of the code line..
  const hashedPassword = bcryptjs.hashSync(password, 10);
  // due to es6, {name:name} ===> {name}
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    // res.status(500).json(error.message);
    next(error);
    // next(errorHandler(300,"Something went wrong!"));
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found"));
    const isValidPassword = await bcryptjs.compare(
      password,
      validUser.password
    );
    if (!isValidPassword) return next(errorHandler(401, "Wrong Credentials"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    // removing the password from getting to client side..
    const { password: hashedPassword , ...rest } = validUser._doc;

    // expiry limit..
    const expiryDate = new Date(Date.now() + 3600000)  // 1 hour

    res
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
