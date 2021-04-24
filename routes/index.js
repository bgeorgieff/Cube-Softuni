const { Router } = require('express')
const { getAllCubes, getCube } = require('../controllers/cubes')
const Cube = require('../models/cube')

const router = Router()

router.get('/', async (req, res) => {
    const cubes = await getAllCubes()
    res.render('index', {
        title: 'Cube Main Page',
        cubes
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

router.post('/create', (req, res) => {
    const {
        name, 
        description,
        imageUrl,
        difficultyLevel
    } = req.body

    const cube = new Cube({name, description, imageUrl, difficulty: difficultyLevel})
    
    cube.save((err) => {
        if (err) {
            console.error(err)
        } else {
            res.redirect('/')
        }
    })
})

router.get('/details/:id', async (req, res) => {
    const cube = await getCube(req.params.id)

    res.render('details', {
        title: 'Cube details',
        ...cube
    })
})

router.get('*', (req, res) => {
    res.render('404', {
        title: 'Page not found'
    })
})

module.exports = router