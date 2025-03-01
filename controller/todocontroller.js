const { Todo } = require("../models/listTodo");

const getAllTodoList = async (req, res) => {
  try {
    const retrieveAllTodo = await Todo.find({});

    res.status(200).render("index", { todos: retrieveAllTodo });
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
      status.trim().toLowerCase() === "completed" ? "Completed" : "Pending";

    const newTodo = await Todo.create({
      name,
      dueDate,
      priority,
      status: normalizedStatus,
    });

    res.redirect("/todos");
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

const delTodo = async (req, res) => {
  try {
    const id = req.params.id;

    const del_data = await Todo.findByIdAndDelete(id);

    res.status(200).redirect("/todos");
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

const RetrieveSingleRecord = async (req, res) => {
  try {
    const id = req.params.id;

    const findsingledata = await Todo.findById(id);

    if (!findsingledata) {
      return res.status(404).json({
        status: false,
        message: "Todo Not Found For This Particular ID",
      });
    }
    res.render("update", { todo: findsingledata });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};
const updateTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const datatoupdate = req.body;

    const findandupdate = await Todo.findByIdAndUpdate(id, datatoupdate, {
      new: true,
    });

    if (!findandupdate) {
      res.status(404).json({
        status: false,
        message: "Todo not found",
      });
    }
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
  delTodo,
  RetrieveSingleRecord,
  updateTodo
};
