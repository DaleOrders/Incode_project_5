-- create tables
-- ❒ The schema contains a users table
-- ❒ The schema contains a ratings table
-- ❒ The users table contains at least the following fields: ID, email address, password
-- ❒ The ratings table contains at least the following fields: ID, movie_id (corresponding to the API ID), rating, user_id


DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  surname VARCHAR(255) NOT NULL,
  firstname VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  passwords VARCHAR(64) NOT NULL

);


DROP TABLE IF EXISTS ratings;
CREATE TABLE IF NOT EXISTS ratings (
   rating_id SERIAL PRIMARY KEY,
   user_id VARCHAR NOT NULL,
   movie_id VARCHAR NOT NULL,
   create_at TIMESTAMPTZ
   update_at TIMESTAMPTZ
   rating CHECK(rating_value BETWEEN 0 AND 5),
   FOREIGN KEY(user_id) 
   REFERENCES users(user_id)
   ON DELETE CASCADE
   



  
)