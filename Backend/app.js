import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./routes/route.js";
import cors from "cors";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.options("*", cors());

app.use("/", router);
mongoose
  .connect(process.env.URL)
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log(error);   
  });

const PORT = process.env.PORT || 4000;
app.listen(process.env.PORT, () => {
  console.log(`App running on port http://localhost:${process.env.PORT}`);
});
