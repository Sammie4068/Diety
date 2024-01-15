const { req, res, next } = require("express");
const {
  getAllRecipes,
  getName,
  getCategory,
  getRecipeByID,
  getFilteredName,
  updateUser,
  updateBookmark,
} = require("../../models/index");

exports.getRecipes = async (req, res, next) => {
  try {
    const results = await getAllRecipes();
    const result = results.rows;
    result.forEach((rec) => {
      rec.ingredients = JSON.parse(rec.ingredients);
      rec.instructions = JSON.parse(rec.instructions);
    });
    res.json({number: result.length, data: result});
  } catch (err) {
    next(err);
  }
};

exports.getMealName = async (req, res, next) => {
  try {
    const results = await getName(req.params.name);
    const result = results.rows;
    result.forEach((rec) => {
      rec.ingredients = JSON.parse(rec.ingredients);
      rec.instructions = JSON.parse(rec.instructions);
    });
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.getMealCategory = async (req, res, next) => {
  try {
    const results = await getCategory(req.params.category);
    const result = results.rows;
    result.forEach((rec) => {
      rec.ingredients = JSON.parse(rec.ingredients);
      rec.instructions = JSON.parse(rec.instructions);
    });
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.getRecipesByID = async (req, res, next) => {
  try {
    const results = await getRecipeByID(req.params.id);
    const result = results.rows;
    result.forEach((rec) => {
      rec.ingredients = JSON.parse(rec.ingredients);
      rec.instructions = JSON.parse(rec.instructions);
    });
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.getFilteredNameMeal = async (req, res, next) => {
  try {
    const results = await getFilteredName(req.params.name, req.params.category);
    const result = results.rows;
    result.forEach((rec) => {
      rec.ingredients = JSON.parse(rec.ingredients);
      rec.instructions = JSON.parse(rec.instructions);
    });
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.updateUserProfile = async (req, res, next) => {
  try {
    const { name, email, phone, id } = req.body;
    await updateUser(name, email, phone, id);
    return res.json({ message: "success" });
  } catch (err) {
    next(err);
  }
};

exports.addBookmark = async (req, res, next) => {
  try {
    const { bookmark, id } = req.body;
    await updateBookmark(JSON.stringify(bookmark), id);
    return res.json({ message: "done" });
  } catch (err) {
    next(err);
  }
};
