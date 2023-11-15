const { Router } = require("express");
const router = Router();
const {login, register, getUsers} = require("../../controllers/index")


router.get("/register", getUsers);

router.post("/register", register);

router.post("/login", login);

module.exports = router;
