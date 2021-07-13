// signup route

const express = require('express')
const db = require('../database')
const router = express.Router()

const bcrypt = require('bcrypt');
const saltRounds = 10;

// middleware for users that are already logged in
const loggedInMessage = (req, res, next) => {
    if (req.session.userId) {
        res.render('pages/signup', {
            message: req.query.message ? req.query.message : "You are already logged in"
        })
    } else {
        next()
    }
}

router.get('/', loggedInMessage, (req,res)=>{
    res.render('pages/signup', {
        layout:'./layouts/nonav',
        message:req.query.message,
        documentTitle: "Signup"
    })
})

router.post('/', (req, res) => {
    const name=req.body.first_name
    const surname=req.body.surname
    const email=req.body.email.toLowerCase()
    const password = req.body.password
    const confirmPassword = req.body.confirmPassword


    const validateEmail=/^[a-zA-Z0-9\-_]+[a-zA-Z0-9\-_\.]*@[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_\.]+$/
    const validatePassword=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[^a-zA-Z\d]).{5,32}$/

    const emailValidation=validateEmail.test(email)
    const passwValidation=validatePassword.test(req.body.password,)

    if (!emailValidation) {
        return res.redirect("/signup?message=Email%20don't%20match.")
    }
    if (!passwValidation) {
        //123qweQWE!@#
        return res.redirect("/signup?message=Password%20must%20contain%20at%20least%20one%20uppercase,%20one%20lowercase,%20a%20number,%20one%20special%20character%20and%205%20characters%20long.")
    }

    //if any fields are empty issue error message
    if (name === '' || surname === '' || email === ''|| password === ''|| confirmPassword === '') {
        return res.redirect('/signup?message=Please%20fill%20in%20all%20fields%20')
    }
    //if passwords are different, issue error message
    if (req.body.password != req.body.confirmPassword) {
        return res.redirect('/signup?message=Please%20ensure%20passwords%20are%20the%20same.')
    }   

    db.oneOrNone('SELECT * FROM users WHERE email = $1;', [email])
        .then((existingUser)=>{
            if(existingUser){
                return res.redirect('/signup?message=User%20already%20exists.')
            } else {
                const newUser = {
                    password: bcrypt.hashSync(req.body.password, saltRounds)
                }
                db.none('INSERT INTO users(firstname, surname, email, passwords) VALUES ($1, $2, $3, $4);', [name, surname, email, newUser.password])
                .then(()=>{
                    console.log('User successfully created')
                    res.render('pages/login')
                })
                .catch((err)=>{
                    console.log(err)
                    res.redirect('/signup?message=Error%20occured%20,please%20try%20again')
                    })
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    })


module.exports = router