import User from "../model/user.js";
import bcrypt from "bcrypt";

export const signupUser = async (request, response) => {
  try {
    const { name, username, email, password } = request.body;

    const checkUsername = await User.findOne({ username });
    const checkMail = await User.findOne({ email });

    if(checkUsername) {
        return response.status(409).json({
            status: 409,
            message: "Username already exist"
        })
    }

    if(checkMail) {
        return response.status(409).json({
            status: 409,
            message: "Email already exist"
        })
    }

    const hashPass = await bcrypt.hash(password, 12);
    
    const newUser = new User({
      name,
      username,
      email,
      password: hashPass,
    });

    await newUser.save();

    return response.status(200).json({
      status: 200,
      msg: "Signed up successfully",
      user: newUser
    });
    
  } catch (error) {
    return response.status(500).json({
      status: 500,
      error: error,
      msg: "Something went wrong",
    });
  }
};
