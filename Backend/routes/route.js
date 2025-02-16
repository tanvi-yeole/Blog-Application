import express from "express";

import { signupUser } from "../controller/user-controller.js";
import { loginUser } from "../controller/user-controller.js";
import { Logout } from "../controller/user-controller.js";

import { createPost } from "../controller/post.controller.js";

import multer from "multer";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", Logout)

router.post("/createPost", upload.single('file'), createPost)

export default router;