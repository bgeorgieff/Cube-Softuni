const { Router } = require('express')
const { getAllCubes } = require('../controllers/cubes')
const { getCube } = require('../controllers/database')

const router = Router()

router.get('/', (req, res) => {
    getAllCubes((cubes) => {
        res.render('index', {
            title: 'Cube Main Page',
            cubes
        })
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
    getCube(req.params.id, (cube) => {
        res.render('details', {
            title: 'Cube details',
            ...cube
        })
    })
})

router.get('*', (req, res) => {
    res.render('404', {
        title: 'Page not found'
    })
})

module.exports = router