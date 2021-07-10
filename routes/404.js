const express = require('express')
const router = express.Router()

router.get('/', (req,res)=>{
    res.status(404).render('pages/404', {
        errorTitle: 'Oops, nothing here...'
    })
})


module.exports = router