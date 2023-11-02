const { Router } = require("express");
const router = Router();
const {register, getUsers} = require("../../controllers/index")


router.get("/register", getUsers);

router.post("/register", register);

module.exports = router;
