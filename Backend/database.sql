-- creating database
CREATE DATABASE diety;

-- creating users table
CREATE TABLE users (
    id serial PRIMARY KEY,
    name VARCHAR NOT NULL,
    email VARCHAR NOT NULL UNIQUE,
    password VARCHAR NOT NULL,
    active BOOLEAN DEFAULT true
);

-- creating recipe table
CREATE TABLE recipes (
    id serial PRIMARY KEY,
    name VARCHAR NOT NULL,
    image VARCHAR NOT NULL,
    type VARCHAR NOT NULL,
    category VARCHAR NOT NULL,
    ingredients VARCHAR NOT NULL,
    description VARCHAR NOT NULL,
    timer VARCHAR NOT NULL,
    publisher VARCHAR NOT NULL
);

CREATE TABLE meals (
    id serial PRIMARY KEY,
    name VARCHAR NOT NULL,
    image VARCHAR NOT NULL,
    type VARCHAR NOT NULL,
    category VARCHAR NOT NULL,
    ingredients VARCHAR NOT NULL,
    instruction VARCHAR NOT NULL,
    timer VARCHAR NOT NULL,
    publisher VARCHAR NOT NULL
);

CREATE TABLE nutritionist (
    id serial PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    date_of_birth DATE,
    email VARCHAR(255) UNIQUE,
    mobile_number VARCHAR(15),
    gender VARCHAR(10),
    passport VARCHAR(20),
    id_card VARCHAR(20),
    id_number VARCHAR(20),
    issued_authority VARCHAR(255),
    issued_state VARCHAR(255),
    issued_date DATE,
    expiry_date DATE,
    address_type VARCHAR(50),
    nationality VARCHAR(50),
    state VARCHAR(50),
    district VARCHAR(50),
    block_number VARCHAR(10),
    ward_number VARCHAR(10)
);
-- inserting into recipe table
INSERT INTO recipes (name, image, type, category, ingredients, description, timer, publisher) VALUES ('oatmeal', '/img/oatmeal.jpg', 'breakfast', 'diabetes', '1/2 cup of old-fashioned rolled oats (for one serving), 1 cup of milk (you can use water if you prefer, Optional sweeteners or flavorings: honey, maple syrup, brown sugar, cinnamon, vanilla extract, fresh fruits, nuts, or dried, fruits', 'Measure the Oats: Start by measuring out 1/2 cup of old-fashioned rolled oats. This amount is for one serving. If you are making oatmeal for multiple people, adjust the quantity accordingly.;Combine Oats and Liquid: In a saucepan, combine the oats and 1 cup of milk (or water) for every 1/2 cup of oats. use more liquid for thinner oatmeal or less for thicker oatmeal.;Cook the Oatmeal: Place the saucepan on the stove over medium heat.;Stir the oats and liquid frequently as they cook to prevent sticking or burning.;Oatmeal is ready when it thickens to your liking, typically within 5-10 minutes. You can cook it longer for a creamier consistency or shorter for a thicker one.;Sweeten and Flavor: Once the oatmeal is cooked to your desired consistency, you can add sweeteners and flavorings to taste. Common options include honey, maple syrup, brown sugar, cinnamon, a dash of vanilla extract, fresh fruits (e.g., sliced bananas, berries), nuts (e.g., almonds, walnuts), or dried fruits (e.g., raisins,cranberries).;Serve: Pour the oatmeal into a bowl and add your chosen toppings. You can get creative with the toppings to suit your preferences.;Enjoy: Your oatmeal is now ready to be enjoyed. Be careful as it will be hot, so let it cool a bit before eating.', '30 mins', 'Healthy Living');

INSERT INTO recipes (name, image, type, category, ingredients, description, timer, publisher) VALUES ('garri', '/img/garri.jpg', 'lunch', 'cancer', 'garri,sugar,groundnut', 'put garri in cup; pour water; allow to rise; add sugar and groundnut to taste', '2 mins', 'sapa bundle');

INSERT INTO recipes (name, image, type, category, ingredients, description, timer, publisher)
 VALUES ('Daily Shake', '/img/daily-shake.', 'breakfast', 'diabetics', '1/2 cup Greek yogurt, 1/2 cup almond milk,
  1/4 cup fresh spinach, 1/4 cup fresh blueberries, 1 tablespoon grapeseed oil, 1 tablespoon ground chia seeds, 1 tablespoon ground flax seed, 1 tablespoon ground almonds', 'Blend yogurt almond milk, spinach, blueberries, grapeseed oil, chia seeds, flax seed, and almonds together in a blender until smooth.', '10 mins', 'allrecipes');