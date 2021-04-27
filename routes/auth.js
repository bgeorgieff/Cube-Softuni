const express = require('express')
const { saveUser, verifyUser, guestAccess, getUserStates } = require('../controllers/user')

const router = express.Router()

router.get('/login', guestAccess, getUserStates, (req, res) => {
    res.render('loginPage', {
        isLoggedIn: req.isLoggedIn
    })
})

router.get('/register', guestAccess, getUserStates, (req, res) => {
    res.render('registerPage', {
        isLoggedIn: req.isLoggedIn
    })
})

router.post('/register', async (req,res) => {

    const status = await saveUser(req, res)

    if (status) {
        return res.redirect('/')
    }
})

router.post('/login', async (req,res) => {

    const status = await verifyUser(req, res)

    if (status) {
        return res.redirect('/')
    }
})

module.exports = router