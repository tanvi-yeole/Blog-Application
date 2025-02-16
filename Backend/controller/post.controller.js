import Post from "../model/post.js";
import fs from "fs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const createPost = async (req, res) => {
  try {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);

    const { token } = await req.cookies;
    if (!token) {
      return res.status(401).json({ status: 401, message: "No token provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, decoded) => {
      if (err) throw err;
      const { title, content } = req.body;
      const postDoc = await Post.create({
        title,
        content,
        cover: newPath,
        author: decoded.id,
      });
      res.status(200).json({
        status: 200,
        message: "Post created successfully",
        data: postDoc,
      });
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};
