import express from "express";
//import cors from "cors";
import cors from "cors";
//import { readdirSync } from "fs";
import { readdirSync } from "fs";
import mongoose from "mongoose";
//import csrf from "csurf";
import csrf from "csurf";
//import cookieParser from "cookie-parser";
import cookieParser from "cookie-parser";

import dotenv from 'dotenv'
import weird from `./routes/${r}`

import morgan from "morgan";
dotenv.config();

const csrfProtection = csrf({ cookie: true });

//create express
const app = express();

//db
connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB conn err => ", err));

//middlewares
app.use(cors());
app.use(json({ limit: "5mb" }));
app.use(cookieParser());
app.use(morgan("dev"));

//route
readdirSync("./routes").map((r) => app.use("/api", weird));
//csrf
app.use(csrfProtection);

app.get("/api/csrf-token", (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

//port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
