// login route

const express = require('express')
const db = require('../database')
const router = express.Router()
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    res.render('pages/login',   {
        message: req.query.message,   
        layout:'./layouts/nonav',
    })
    
})

router.post('/', (req, res) => {
    const email = req.body.email
    const password = req.body.password

    //if a field is missing
    if (email === '' || password === '') {
        return res.redirect('/login?message=Please%20insert%20both%20email%20and%20password.')
    }

    db.oneOrNone('SELECT * FROM users WHERE email = $1;', [req.body.email.toLowerCase()])
        .then((existingUser) => {
            console.log(existingUser)
            if (!existingUser) {
                return res.redirect('/login?message=User%20does%20not%20exist')
                }
            const hash = existingUser.passwords
            console.log(typeof existingUser.passwords)

            bcrypt.compare(req.body.password, hash, function (err, result) {
                if (result) {
                    req.session.userId = existingUser.id
                    res.redirect('/')
                } else {
                    console.log(err)
                    res.redirect('/login?message=Incorrect%20login%20details.')
                        }
            }
            )}
            )
            .catch((err)=>{
                console.log(err)
            })
        })


module.exports = router