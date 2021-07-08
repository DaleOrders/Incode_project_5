//import and initialise express
const express = require('express')
const app = express()
const session = require('express-session')
const path = require('path')
//initialise database connection as db
const db = require('./database')
const port = process.env.PORT || 3000

//layouts
const expressLayouts = require('express-ejs-layouts')
app.use(expressLayouts)

//body passer
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//set view engine
app.set('view engine', 'ejs')
app.set('views', './views')
app.use('', express.static(path.join(__dirname, 'public')))

//syntax highlighting
const morgan = require('morgan')
app.use(morgan('dev'))


//session setup

// session setup
app.use(session({
    cookie: {
        maxAge: 3600000, // 1 hour
        // secure: false, // must be true if served via HTTPS
    },
    name: 'movie_db',
    secret: 'Its a secret!',
    resave: false,
    saveUninitialized: false
}))



//routes


const detailsRouter=require('./routes/details')
app.use('/details', detailsRouter)

const loginRouter=require('./routes/login')
app.use('/login', loginRouter)

const homepageRouter=require('./routes/homepage')
app.use('/homepage', homepageRouter)

const signupRouter=require('./routes/signup')
app.use('/signup', signupRouter)

const ratingRouter = require('./routes/rating')
app.use('/rating', ratingRouter)

//test search
const searchRouter = require('./routes/search')
app.use('/search', searchRouter)


const errorRouter=require('./routes/404')
app.use('*', errorRouter)




app.listen(port, () => {
    console.log(`Movie app listening at http://localhost:${port}`)
})

