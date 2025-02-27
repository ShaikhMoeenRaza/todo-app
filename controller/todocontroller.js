const { Todo } = require("../models/listTodo");

const getAllTodoList = async (req, res) => {
  try {
    const retrieveAllTodo = await Todo.find({});

    res.status(200).render('index',{ todos: retrieveAllTodo });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching todos",
      error: err,
    });
  }
};

const addTodoContent = async (req, res) => {
  try {
    const { name, dueDate, priority, status = "Pending" } = req.body;

    const normalizedStatus = 
    status.trim().toLowerCase() === "completed" 
      ? "Completed" 
      : "Pending";
      
    const newTodo = await Todo.create({
      name,
      dueDate,
      priority,  status: normalizedStatus,
    });

    res.redirect('/todos');
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

module.exports = {
  getAllTodoList,
  addTodoContent,
};
