const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const workflowRoutes = require("./Routes/workflows");
var cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 8080;

//Connecting to db
mongoose.connect(process.env.DB_CONNECT, () => {
  console.log("Connected to DB");
});

//Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Route middleware
app.use("/workflow", workflowRoutes);

app.listen(port, () => {
  console.log("Listening", port);
});
