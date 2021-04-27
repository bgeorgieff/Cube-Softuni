const { Router } = require('express')
const { getAllCubes } = require('../controllers/cubes')
const { getUserStates } = require('../controllers/user')

const router = Router()

router.get('/', getUserStates, async (req, res) => {
    const cubes = await getAllCubes()
    res.render('index', {
        title: 'Cube Main Page',
        cubes,
        isLoggedIn: req.isLoggedIn
    })
   
})

router.get('/about', (req, res) => {
    res.render('about', {
        title: 'About this project'
    })
})

router.post('/search', async (req, res) => {
    const {
        search,
        from,
        to
    } = req.body

    let cubes = (await getAllCubes()).filter(cubes => {
        return cubes.name.toLowerCase().includes(search.toLowerCase())
    })

    if (from && to) {
        cubes = cubes.filter(cubes => cubes.difficulty >= from && cubes.difficulty <= to);
    }

    res.render("index", {
        title: "Cube Main Page",
        cubes
    })
})

router.get('*', (req, res) => {
    res.render('404', {
        title: 'Page not found',
    })
})

module.exports = router