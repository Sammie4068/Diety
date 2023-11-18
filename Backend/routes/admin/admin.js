const { Router } = require("express");
const router = Router();
const multer = require("multer");
const {
  addMealRecipes,
  updateActive,
  getMealByname,
  deleteMeals,
  updateRecipe,
} = require("../../controllers/index");

const upload = multer({ dest: "./uploads" });

router.post("/recipes", upload.single("image"), addMealRecipes);

router.post("/active", updateActive);

router.get("/recipes/:name", getMealByname);

router.delete("/recipes/delete/:id", deleteMeals);

router.post("/recipes/update", upload.single("image"), updateRecipe);

module.exports = router;
