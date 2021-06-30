| Users     |                        |
|-----------|------------------------|
| id        | SERIAL   PRIMARY   KEY |
| surname   | VARCHAR                |
| firstname | VARCHAR                |
| email     | VARCHAR                |
| passwords | VARCHAR                |


| rating    |                    |
|-----------|--------------------|
| rating_id | SERIAL PRIMARY KEY |
| user_id   | VARCHAR            |
| movie_id  | VARCHAR            |
| create_at | TIMESTAMPTZ        |
| update_at | TIMESTAMPTZ        |
| rating    | VARCHAR            |