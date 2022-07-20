//import express from "express";
const express = require("express");
//import cors from "cors";
const cors = require("cors");
//import { readdirSync } from "fs";
const { readdirSync } = require("fs");
//import mongoose from "mongoose";
const mongoose = require("mongoose");
//import csrf from "csurf";
const csrf = require("csurf");
//import cookieParser from "cookie-parser";
const cookieParser = require("cookie-parser");

const morgan = require("morgan");
require("dotenv").config();

const csrfProtection = csrf({ cookie: true });

//create express
const app = express();

//db
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB conn err => ", err));

//middlewares
app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());
app.use(morgan("dev"));

//route
readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));
//csrf
app.use(csrfProtection);

app.get("/api/csrf-token", (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

//port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
