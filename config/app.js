const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const compression = require("compression");
const ConnectDB = require("./../database/database");
const dotenv = require("dotenv").config();

//connexion with mongoDB
ConnectDB();

// App middlewares
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/home", (req, res) => {
  res.status(200).json("Welcome, your app is working well");
});

// App routes
app.use("/auth", require("./../routes/Auth.routes"));
app.use("/chat", require("./../routes/chat.routes"));

module.exports = app;
