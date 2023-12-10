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

exports.getMealByname = async (name)=>{
return db.query("SELECT * FROM meals WHERE name=$1", [name]);
}

exports.deleteMeals = async (id) => {
  return db.query("DELETE FROM meals WHERE id=$1", [id])
}

exports.getUserByID = async (id) => {
  return db.query("SELECT * FROM users WHERE id=$1", [id])
}

exports.activeToFalse = async (id) => {
  return db.query("UPDATE users SET active = 'false' WHERE id=$1", [id]);
}

exports.activeToTrue = async (id) => {
  return db.query("UPDATE users SET active = 'true' WHERE id=$1", [id]);
}

exports.updateRecipe = async (recipe) => {
  return db.query(
    "UPDATE meals SET name = $2, image=$3, type=$4, category=$5, ingredients=$6, instructions=$7, timer=$8, publisher=$9 WHERE id=$1",
    [
      recipe.id,
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
}