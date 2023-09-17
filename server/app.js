require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./routes/index.route");
const app = express();

const PORT = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);
app.use(cors());

app.listen(PORT, () => console.log("Server is listing @" + PORT));
