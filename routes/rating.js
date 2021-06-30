// rating route

const express = require('express')
const db = require('../database')
const router = express.Router()




    router.get('/', (req, res) => {
        const query = "select sum(rating) as totalRating, sum(rating)/count(user_id) as avgRating from ratings group by movie_id;"
         db.any(query)
         .then((rating) =>{
            
               
                res.render('pages/rating',{
        
                    layout:'./layouts/full-width',
                    rating:  rating
                    
                })
           
         })
         .catch((err) => {
            res.redirect('/error')
        })
        })

    router.post('/', (req, res) => {
 
      
       db.none('insert into ratings(rating, movie_id, user_id)' +
       'values($1, $2, $3)',[4, 1, 1])
       .then(() => {
          res.redirect('/rating')
       })
       .catch((err) => {
           res.send("error")
        })

    })

module.exports = router