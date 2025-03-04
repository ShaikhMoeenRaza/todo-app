const users = require("../models/user");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await users.findOne({ username: username });

    if (!user) {
      return res.render("login", {
        error: "User Not Found Plzz Register First",
      });
    } else {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          return res.status(500).send("Error during password comparison");
        }

        if (result) {
          req.session.user = user;

          res.redirect("/dashboard");
        } else {
          res.render("login", { error: "Invalid Password!" });
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("There Is An Error During Login");
  }
};

const register = async (req, res) => {
  const { name, username, email, password } = req.body;

  try {
    const hashedpassword = bcrypt.hashSync(password, 10);

    const userExists = await users.findOne({
      $or: [{ username: username }, { email: email }],
    });

    if (userExists) {
      return res.render("index", { error: "Username Already Exists!!" });
    }
    users.create({ name, username, email, password: hashedpassword });
    res.render("dashboard", { error: null });
  } catch (err) {
    console.log(err);
    res.status(500).send("There Is An Error Occurred During Register");
  }
};
module.exports = {
  login,
  register,
};
