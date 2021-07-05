//details route

const express = require('express')
const db = require('../database')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('pages/details', {
        message: req.query.message
    })
})

router.post('/', (req, res) => {
   console.log("Done")
   console.log(req.body.rating)
   
})

module.exports = router