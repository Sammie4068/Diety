const { Router } = require("express");
const router = Router();
const { addMealRecipes } = require("../../controllers/index");

router.post("/recipes", addMealRecipes)

module.exports = router;