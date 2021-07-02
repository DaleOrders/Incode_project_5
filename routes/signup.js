// signup route

const express = require('express')
const db = require('../database')
const router = express.Router()


router.get('/', (req,res)=>{
    res.render('pages/signup', {
        message:req.query.message
    })
})

router.post('/', (req, res)=>{
    const name=req.body.first_name
    const surname=req.body.surname
    const email=req.body.email
    const password = req.body.password
    const confirmPassword = req.body.confirmPassword

    //if any fields are empty issue error message
    if (name === '' || surname === '' || email === ''|| password === ''|| confirmPassword === '') {
        return res.redirect('/signup?message=Please%20fill%20in%20all%20fields%20')
    }

    //if passwords are different, issue error message
    if (password !== confirmPassword) {
        return res.redirect('/signup?message=Please%20ensure%20passwords%20are%20the%20same.')
    }

    //if passwords are not 8 characters, issue error message
    if (password.length !== 8||confirmPassword.length !== 8){
        return res.redirect('/signup?message=Please%20ensure%20passwords%20are%20at%20least%208%20characters.')
    }

    db.oneOrNone('SELECT * FROM users WHERE email=$1;', [email])
        .then((existingUser)=>{
            if(existingUser){
                return res.redirect('/signup?message=User%20already%20exists.')
            }
            else{
                const password=bcrypt.hashSync(password, saltRounds)
                db.none('INSERT INTO users(first_name, surname, email, passwords) VALUES ($1, $2, $3, $4);', [name, surname, email, password])
                .then(()=>{
                    console.log('User successfully created')
                    res.redirect('/login')
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