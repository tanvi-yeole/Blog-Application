import User from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Token from "../model/token.js";
import dotenv from "dotenv"

dotenv.config()

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
    if (match) {
      const accessToken = jwt.sign(
        user.toJSON(),
        process.env.ACCESS_SECRET_KEY,
        { expiresIn: "15m" }
      );

      const refreshToken = jwt.sign(
        user.toJSON(),
        process.env.REFRESH_SECRET_KEY
      );

      const newToken = new Token({ token: refreshToken });
      await newToken.save();

      response.status(200).json({
        accessToken: accessToken,
        refreshToken: refreshToken,
        name: user.name,
        username: user.username,
      });
    } else {
      return response.status(400).json({ msg: "password does not match" });
    }
  } catch (error) {
    return response.json({
      error: error.message
    })
  }
};
