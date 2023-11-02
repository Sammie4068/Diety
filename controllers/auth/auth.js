const { req, res, next} = require("express")
const {getUserByEmail, addUsers, getAllUsers} = require("../../models/index"); 
const bcrypt = require("bcrypt");

exports.getUsers = async (req, res) => {
  const results = await getAllUsers();
  res.json(results.rows);
}


exports.register = async (req, res, next) => {
    try {
      const results = await getUserByEmail(req.body.email)
      if (results.rows.length > 0) {
        res.json({ message: "Already Exists" });
      } else {
        let hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = { name: req.body.name, email: req.body.email, hashedPassword}
        const result = await addUsers(user)
        res.json({ message: "Success" });
      }
    } catch (err) {
      return next(err);
    }
  }