//details route

const express = require("express");
const db = require("../database");
const router = express.Router();

/* router.get("/", (req, res) => {
  res.render("pages/details", {
    message: req.query.message,
  });
}); */
router.get('/:id', (req, res) =>{
    console.log(req.params.id)
    res.render("pages/details", {
        movieId: req.params.id
      });
})


router.post("/", (req, res) => {
  const rating = req.body.rating;
  const movieId = 550; //change later
  const userId = 1; // change later when session ready
  const obj = {
    message: ""
  }
  db.any(
    "select count(*) as count from ratings where user_id = $1 and movie_id = $2",
    [userId, movieId]
  )
    .then((results) => {
      if (results[0].count > 0) {
        //user already rating this movie
        db.none(
            "update ratings set rating = $1, update_at = CURRENT_TIMESTAMP where user_id = $2 and movie_id = $3",
            [rating,userId, movieId]
          )
            .then((data) => {
              obj['message'] = "Successfully updated rating."
              return res.send(JSON.stringify(obj));
            })
            .catch((err) => {
              console.log(err)
              obj['message'] = "fail to update."
              return res.send(JSON.stringify(obj));
            });

      } else {
        db.none(
          "insert into ratings (movie_id, rating, user_id)" +
            "values($1, $2, $3)",
          [movieId, rating, userId]
        )
          .then((data) => {
            obj['message'] = "successfully added."
            return res.send(JSON.stringify(obj));
          })
          .catch((err) => {
            obj['message'] = "fail to add."
            return res.send(JSON.stringify(obj));
          });
      }
    })
    .catch((err) => {
      res.redirect("/error");
    });
});

module.exports = router;
