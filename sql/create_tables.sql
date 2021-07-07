-- create tables
-- ❒ The schema contains a users table
-- ❒ The schema contains a ratings table
-- ❒ The users table contains at least the following fields: ID, email address, password
-- ❒ The ratings table contains at least the following fields: ID, movie_id (corresponding to the API ID), rating, user_id


DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  firstname VARCHAR(255) NOT NULL,
  surname VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  passwords VARCHAR(64) NOT NULL
);


DROP TABLE IF EXISTS ratings;
CREATE TABLE IF NOT EXISTS ratings (
   rating_id SERIAL PRIMARY KEY,
   movie_id INT NOT NULL,
   rating INTEGER CHECK(rating >=0 AND rating <=5),
   user_id INT NOT NULL,
   create_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
   update_at TIMESTAMPTZ,
   CONSTRAINT fk_customer
    FOREIGN KEY(user_id) 
      REFERENCES users(id)
);
