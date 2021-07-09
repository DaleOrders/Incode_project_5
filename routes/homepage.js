// homepage route
const express = require("express");
const db = require("../database");
const router = express.Router();

router.get('/', (req,res)=>{
    res.render('pages/homepage', {
        rating:rating
    })
})

module.exports = router

