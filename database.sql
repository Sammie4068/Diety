-- creating database
CREATE DATABASE recipeapp

-- creating users table
CREATE TABLE users (
   id serial PRIMARY KEY,
   name VARCHAR(50),
   email VARCHAR(50),
   password VARCHAR
);
