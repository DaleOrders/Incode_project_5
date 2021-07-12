const express = require('express')
const router = express.Router()
const{ redirectToLogout } = require('../middleware')

router.get('/', redirectToLogout, (req, res) => {
    res.clearCookie('movie_db')
    req.session.destroy(function(err) {
        if (err) {
            console.log(err)
            res.send(err.message)
        } else {
            res.clearCookie('movie_db')
            res.redirect('/')
        }
    })
    console.log(req.session)
})

module.exports = router