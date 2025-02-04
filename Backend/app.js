import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./routes/route.js";

dotenv.config();

const app = express();

mongoose
  .connect(process.env.URL)
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log(error);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

app.get("/", (req, res) => {
  res.json({ message: "Hello" });
});

app.listen(process.env.PORT, () => {
  console.log(`App running on port http://localhost:${process.env.PORT}`);
});
