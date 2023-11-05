-- creating database
CREATE DATABASE recipeapp

-- creating users table
CREATE TABLE users (
    id serial PRIMARY KEY,
    name VARCHAR NOT NULL,
    email VARCHAR NOT NULL UNIQUE,
    password VARCHAR
);
