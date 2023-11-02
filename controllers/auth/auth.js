const { req, res, next} = require("express")
const {getUserByEmail, addUsers, getAllUsers} = require("../../models/index"); 
const bcrypt = require("bcrypt");

exports.getUsers = async (req, res) => {
  const results = await getAllUsers();
  res.json(results.rows);
}

exports.login = async (req, res, next) => {
    try {
      const foundUser = await getUserByEmail(req.body.email)
      if (foundUser.rows.length === 0) {
        return res.json({ message: "Invalid" });
      }
      const hashedPassword = await bcrypt.compare(
        req.body.password,
        foundUser.rows[0].password
      );
      if (hashedPassword === false) {
        return res.json({ message: "Invalid" });
      }
      return res.json({ message: "logged" });
    } catch (err) {
      return next(err);
    }
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