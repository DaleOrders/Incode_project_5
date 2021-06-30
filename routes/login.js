// login route

const express = require('express')
const db = require('../database')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('pages/login', {
        message: req.query.message
    })
})

router.post('/', (req, res) => {
    const email = req.body.email
    const password = req.body.password

    //if passwords are different, issue error message
    if (password !== confirmPassword) {
        return res.redirect('/login?message=Please%20ensure%20passwords%20are%20the%20same.')
    }

    //if a field is missing
    if (email === '' || password === '') {
        return res.redirect('/login?message=Please%20insert%20both%20email%20and%20password.')
    }

    //if passwords are not 8 characters, issue error message
    else if (password.length !== 8) {
        return res.redirect('/login?message=Please%20ensure%20passwords%20are%20at%20least%208%20characters.')
    } else {
        db.oneOrNone('SELECT * FROM users WHERE email = $1;', [email.toLowerCase()])
            .then((existingUser) => {
                if (!existingUser) {
                    return res.redirect('/login?message=User%20does%20not%20exist')
                } else {
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
            })
            .catch((err)=>{
                console.log(err)
            })
        }


})




module.exports = router