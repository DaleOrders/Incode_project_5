// middleware page

// redirect to homepage if user is logged in
const redirectToHome = (req, res, next) => {
    if(req.session.userId) {
        res.redirect('/')
    } else {
        next()
    }
}

// redirect to logged out page if user is not logged in
const redirectToLogout = (req, res, next) => {
    if (!req.session.userId) {
        res.clearCookie('movie_db')
        res.redirect('/')
    } else {
        next()
    }
}

module.exports = { redirectToHome, redirectToLogout }