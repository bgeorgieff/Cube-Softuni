const { Router } = require('express')
const { getAllCubes, getCube, updateCubes, getCubeWithAccesssories } = require('../controllers/cubes')
const { getAccessories } = require('../controllers/accessories')
const Cube = require('../models/cube')
const Accessory = require('../models/accessory')

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
            res.redirect('/create')
        } else {
            res.redirect('/')
        }
    })
})

router.get('/details/:id', async (req, res) => {
    const cube = await getCubeWithAccesssories(req.params.id)

    res.render('details', {
        title: 'Cube details',
        ...cube
    })
})

router.get('/create/accessory', (req, res) => {
    res.render('createAccessory', {
        title: 'Create'
    })
})

router.post('/create/accessory', async (req, res) => {
    const {
        name,
        description, 
        imageUrl
    } = req.body

    const accessory = new Accessory({name, description, imageUrl})

    await accessory.save((err) => {
        if (err) {
            console.error(err)
            res.redirect('/')
        } else {
            res.redirect('/create/accessory')
        }
    })

})

router.get('/attach/accessory/:id', async (req, res) => {
    const cube = await getCube(req.params.id)
    const accessories = await getAccessories()
    const cubeAccesssories = cube.accessories.map(acc => acc._id.valueOf().toString())

    const notAttached = accessories.filter(e => {
        const accessoryString = e._id.valueOf().toString()
        return !cubeAccesssories.includes(accessoryString)})

    res.render('attachAccessory', {
        title: 'Attach Accessory',
        id: req.params.id,
        ...cube,
        accessories: notAttached,
        canAddAccessory: cube.accessories.length !== accessories.length && accessories.length > 0
    })
})

router.post('/attach/accessory/:id', async (req, res) => {
    const {
        accessory
    } = req.body

    await updateCubes(req.params.id, accessory)

    res.redirect(`/details/${req.params.id}`)
})

router.get('*', (req, res) => {
    res.render('404', {
        title: 'Page not found',
    })
})

module.exports = router