// homepage route
const express = require("express");
const db = require("../database");
const router = express.Router();

<<<<<<< HEAD
router.get('/', (req,res)=>{
    const query = "select sum(rating) as totalRating, sum(rating)/count(user_id) as avgRating from ratings group by movie_id;"
    db.any(query)
        .then(result=>{
            console.log(result)
            res.render('pages/homepage', {
                rating: result.avgRating
            })
        })

        .catch(err=>{
            console.log(err.message)
        })
=======
router.get('/', (req, res) => {
    
    res.render('pages/homepage',   {
      userId : req.session.userId
    })
>>>>>>> 9835eb2d8ae86c356c5f2600631b80e01eea29ce
})
router.get('/get-name', (req, res) => {
    
  const obj = {
    userName: ""
  }
  if(req.session.userId){
      db.one(
        "select firstname from users where id = $1",
        [req.session.userId]
      )
        .then((data) => {
        
          obj['userName'] = data.firstname
          return res.send(JSON.stringify(obj));
        })
        .catch((err) => {
            //handle error
            console.log(err)
        });
      }else{
        return res.send(JSON.stringify(obj));
      }
})

router.get('/get-star', (req, res) => {
   
    const movieId = req.query.movieId;
    const obj = {
        avgScore: 0
      }
    db.any(
    "select count(*) as count from ratings where movie_id = $1",
    [movieId]
  )
    .then((results) => {
      if (results[0].count > 0) {
        
        db.any(
            "select sum(rating)/count(user_id) as avgRating from ratings where movie_id = $1 group by movie_id",
            [movieId]
          )
            .then((data) => {
             
              obj['avgScore'] = Number(data[0].avgrating)
              return res.send(JSON.stringify(obj));
            })
            .catch((err) => {
                //handle error
                console.log(err)
            });

      } else {
        return res.send(JSON.stringify(obj));
      }
    })
    .catch((err) => {
      res.redirect("/error");
    });
    
})

module.exports = router;