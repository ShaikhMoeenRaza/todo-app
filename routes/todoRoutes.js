const express = require('express');
const Router = express.Router();

const {addTodoContent,getAllTodoList} = require("../controller/todocontroller.js");

Router.get('/todos',getAllTodoList);

Router.post('/add',addTodoContent)

module.exports = Router;

