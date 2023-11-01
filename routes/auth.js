const { Router } = require("express");
const router = Router();
const db = require("../db");
const bcrypt = require("bcrypt");

router.get("/register", async (req, res ) =>{
  const results = await db.query("SELECT * FROM users")
  res.json(results.rows)
})

router.post("/register", async (req, res, next) => {
  try {
    const results = await db.query("SELECT * FROM users WHERE email=$1", [
      req.body.email,
    ]);
    console.log(results.rows)
    if (results.rows.length > 0) {
      res.json({message: "Email Already Exists"});
    } else {
      let hashedPassword = await bcrypt.hash(req.body.password, 10);
      const result = await db.query(
        "INSERT INTO users (name,email,password) VALUES ($1,$2,$3) RETURNING *",
        [req.body.name, req.body.email, hashedPassword]
      );
      res.json(result.rows);
    }
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
