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
  const obj = {
    message: ""
  }
  if(req.session.userId){
    console.log(req.session.userId)
        const rating = req.body.rating;
        const movieId = req.body.movieId;
        const userId = req.session.userId
      

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
                    obj['message'] = "Error !!! Please try again."
                    return res.send(JSON.stringify(obj));
                  });

            } else {
              db.none(
                "insert into ratings (movie_id, rating, user_id)" +
                  "values($1, $2, $3)",
                [movieId, rating, userId]
              )
                .then((data) => {
                  obj['message'] = "Successfully rated this movie."
                  return res.send(JSON.stringify(obj));
                })
                .catch((err) => {
                  obj['message'] = "Error !!! Please try again."
                  return res.send(JSON.stringify(obj));
                });
            }
          })
          .catch((err) => {
            res.redirect("/error");
          });
  }else{
    
    obj['message'] = "Please login before rate the movie."
    return res.send(JSON.stringify(obj));
  }
});

module.exports = router;
