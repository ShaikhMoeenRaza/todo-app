const express = require("express");
const Router = express.Router();

const {
  addTodoContent,
  getAllTodoList,
  delTodo,
  RetrieveSingleRecord,
  updateTodo,
} = require("../controller/todocontroller.js");

Router.get("/todos", getAllTodoList);

Router.post("/add", addTodoContent);

Router.post("/deltodo/:id", delTodo);

Router.get("/update/:id", RetrieveSingleRecord);

Router.post("/update/:id", updateTodo);

module.exports = Router;
