const { Router } = require('express')

const router = Router()

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Cube Main Page'
    })
})

router.get('/about', (req, res) => {
    res.render('about', {
        title: 'About this project'
    })
})

router.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create a new cube'
    })
})

router.get('/details/:id', (req, res) => {
    res.render('details', {
        title: 'Cube details'
    })
})

router.get('*', (req, res) => {
    res.render('404', {
        title: 'Page not found'
    })
})

module.exports = router