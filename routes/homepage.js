// homepage route
const express = require("express");
const db = require("../database");
const router = express.Router();

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
})


module.exports = router;





