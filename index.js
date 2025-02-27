const express = require("express");
const mongoose = require("mongoose");

const Router = require('./routes/todoRoutes');

const path = require("path");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, 'public')));

mongoose
  .connect("mongodb://localhost:27017/tododb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => 
    console.log("Mongo DB Connected Successfully.."))
  .catch((err) => console.log("There An Error Solved It This Error", err));

  app.use('/',Router);

app.listen(8000, console.log("Server Started!!"));
