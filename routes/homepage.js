// homepage route
const express = require("express");
const db = require("../database");
const router = express.Router();

router.get('/', (req, res) => {
    res.render('pages/homepage',   {

<<<<<<< HEAD
    })
})

module.exports = router;
=======
<<<<<<< HEAD
router.get('/', (req,res)=>{
    res.render('pages/homepage')
})

=======

router.get('/', (req,res)=>{
    res.render('pages/homepage')
})
>>>>>>> dale



module.exports = router
>>>>>>> 0c58725711b83f730cefcf1f083254d7695123ae
