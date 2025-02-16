import User from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Token from "../model/token.js";
import dotenv from "dotenv";

dotenv.config();

export const signupUser = async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const checkMail = await User.findOne({ email });

    if (checkMail) {
      return response.status(409).json({
        status: 409,
        message: "Email already exist",
      });
    }

    const hashPass = await bcrypt.hash(password, 12);

    const newUser = new User({
      name,
      email,
      password: hashPass,
    });

    await newUser.save();

    return response.status(200).json({
      status: 200,
      msg: "Signed up successfully",
      user: newUser,
    });
  } catch (error) {
    return response.status(500).json({
      status: 500,
      error: error.message,
      msg: "Something went wrong",
    });
  }
};

export const loginUser = async (request, response) => {
  let user = await User.findOne({ username: request.body.username });
  if (!user) {
    return response.status(400).json({ msg: "Username does not match" });
  }
  try {
    let match = await bcrypt.compare(request.body.password, user.password);

    if (!match) {
      return res.status(400).json({
        status: 400,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET
    );
    response.cookie("token", token);
    response.status(200).json({
      accessToken: token,
      name: user.name,
      username: user.username,
    });
  } catch (error) {
    return response.json({
      error: error.message,
    });
  }
};

export const Logout = async (req, res) => {
  const token = await req.cookies.token;
  try {
    if (!token) {
      return res.status(401).json({
        status: 401,
        message: "User needs to be logged in first!",
      });
    }
    res.cookie("token", "").status(200).json({
      status: 200,
      message: "User Logout Success!",
    });
  } catch (error) {
    res
      .status(400)
      .json({
        message: "Logout Failed",
        error: error.message,
      })
      .end();
  }
};
