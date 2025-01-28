import express from "express";
import dotenv from "dotenv"
dotenv.config()

const app = express();

app.get('/', (req,res) => {
    res.json({message: "Hello"})
})

app.listen(process.env.PORT, ()=> {
    console.log(`App running on port http://localhost:${process.env.PORT}`)
})