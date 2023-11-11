const db = require("../../db");

exports.addRecipes = async (recipe) => {
  return db.query(
    "INSERT INTO meals (name, image, type, category, ingredients, instructions, timer, publisher) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
    [
      recipe.name,
      recipe.image,
      recipe.type,
      recipe.category,
      recipe.ingredients,
      recipe.instructions,
      recipe.timer,
      recipe.publisher,
    ]
  );
};


