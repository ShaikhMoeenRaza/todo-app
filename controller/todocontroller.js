const { Todo } = require("../models/listTodo");

const getDashboard = async (req, res) => {
  try {
    res.status(200).render("dashboard");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error While Fetching Dashboard Page");
  }
};
const getAllTodoList = async (req, res) => {
  if (!req.session || !req.session.user) {
    return res.redirect("/login");
  }

  const user = req.session.user;
  try {
    if (user.role === "admin") {
      const todos = await Todo.find({});
    } else {
      const todos = await Todo.find({ user: user._id });
    }
    const todos = await Todo.find({});
    res.render("index", { todos });
  } catch (err) {
    console.error("Error fetching todos:", err);
    res.status(500).send("Error retrieving todos");
  }
};

const addTodoContent = async (req, res) => {
  try {
    const { name, dueDate, priority, status = "Pending" } = req.body;

    const normalizedStatus =
      status.trim().toLowerCase() === "completed" ? "Completed" : "Pending";

      if(!req.session.user){
        return res.status(401).send('Unauthorized: User must be logged in');
      }
      const userId= req.session.user._id;

    const newTodo = await Todo.create({
      name,
      dueDate,
      priority,
      status: normalizedStatus,
      user: userId
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
    res.redirect("/todos");
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
  updateTodo,
  getDashboard,
};
