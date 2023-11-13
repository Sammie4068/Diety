const db = require("../../db");

exports.getUserByEmail = async (email) => {
  return await db.query("SELECT * FROM users WHERE email=$1", [email]);
};

exports.addUsers = async (user) => {
    return db.query(
        "INSERT INTO users (name,email,password,bookmarks) VALUES ($1,$2,$3,$4) RETURNING *",
        [user.name, user.email, user.hashedPassword, user.bookmarks]
      );
}

exports.getAllUsers = async () => {
  return db.query("SELECT * FROM users")
}
