const { req, res, next } = require("express");
const {
  addRecipes,
  activeToFalse,
  activeToTrue,
  getUserByID,
  getMealByname,
  deleteMeals,
  updateRecipe,
} = require("../../models/index");
const uploadImage = require("../../utilities/index")

exports.addMealRecipes = async (req, res, next) => {
  try {
    const response = await uploadImage(req.file.path)
    const { url } = response;

    const recipe = {
      name: req.body.name,
      image: url,
      type: req.body.type,
      category: req.body.category,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
      timer: req.body.timer,
      publisher: req.body.publisher,
    };
    
    const result = await addRecipes(recipe);
    res.json({ message: "success" });
  } catch (err) {
    return next(err);
  }
};

exports.getMealByname = async(req, res, next) => {
  try {
    const results = await getMealByname(req.params.name)
    const result = results.rows;
    result.forEach((rec) => {
      rec.ingredients = JSON.parse(rec.ingredients);
      rec.instructions = JSON.parse(rec.instructions);
    });
    res.json(result);
  } catch (err) {
    return next(err)
  }
}

exports.deleteMeals = async (req, res, next) => {
  try {
    const results = await deleteMeals(req.params.id)
    res.json({ message: "success"})
  } catch (err) {
    return next(err)
  }
}

exports.updateActive = async (req, res, next) => {
  try {
    const { id } = req.body
    const foundUser = await getUserByID(id)
    if(foundUser.rows[0].active){
      await activeToFalse(id)
      return res.json({
        message: "false",
      });
    }else{
      await activeToTrue(id)
      return res.json({
        message: "true",
      });
    }

  } catch (err) {
   return next(err)
  }
}

exports.updateRecipe = async (req, res, next) => {
  try {
   const response = await uploadImage(req.file.path);
   const { url } = response;

   const recipe = {
     id: req.body.id,
     name: req.body.name,
     image: url,
     type: req.body.type,
     category: req.body.category,
     ingredients: req.body.ingredients,
     instructions: req.body.instructions,
     timer: req.body.timer,
     publisher: req.body.publisher,
   };
   const result = await updateRecipe(recipe);
   res.json({ message: "success" });
  } catch (err) {
    next(err)
  }
}