const express = require("express");
const Router = express.Router();

const { login, register } = require("../controller/logincontroller.js");

const {
  addTodoContent,
  getAllTodoList,
  delTodo,
  RetrieveSingleRecord,
  updateTodo,
  getDashboard
} = require("../controller/todocontroller.js");

Router.get("/", (req, res) => {
  res.render("login", { error: null }); 
});

Router.post("/login", login);

Router.post("/register", register);

Router.get('/dashboard', getDashboard)

Router.get("/todos", getAllTodoList);

Router.post("/add", addTodoContent);

Router.post("/deltodo/:id", delTodo);

Router.get("/update/:id", RetrieveSingleRecord);

Router.post("/update/:id", updateTodo);

module.exports = Router;
