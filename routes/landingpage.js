// homepage route
const express = require("express");
const db = require("../database");
const router = express.Router();

router.get('/', (req, res) => {
    res.render('pages/landingpage', {
    layout:'./layouts/nonav',

    })
})

module.exports = router;
router.get('/', (req,res)=>{
    res.render('pages/homepage')
})




module.exports = router

