import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./routes/route.js";
import cors from "cors";
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: ["http://localhost:3000", "https://blogger-rho-gilt.vercel.app/*"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.options("*", cors());

app.use(cookieParser());
app.use("/", router);
app.use('/uploads', express.static('uploads'));

mongoose
  .connect(process.env.URL)
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log(error);   
  });

app.get("/", (req, res) => {
  res.send("Hello from Homepage");
});

const PORT = process.env.PORT || 4000;
app.listen(process.env.PORT, () => {
  console.log(`App running on port http://localhost:${process.env.PORT}`);
});
