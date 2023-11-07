const { Router } = require("express");
const router = Router();
const { getRecipes, getMealType, getMealCategory, getRecipesByID } = require("../../controllers/index")

router.get("/recipes", getRecipes)
router.get("/recipes/category/:category", getMealCategory)
router.get("/recipes/type/:type", getMealType)
router.get("/recipes/id/:id", getRecipesByID)

module.exports = router