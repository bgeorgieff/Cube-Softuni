const express = require('express')
const { getCube, updateCubes } = require('../controllers/cubes')
const { getAccessories } = require('../controllers/accessories')
const { isAuthenticated, getUserStates, isAuthenticatedJSON } = require('../controllers/user')
const Accessory = require('../models/accessory')

const router = express.Router()

router.get('/create/accessory', isAuthenticated, getUserStates, (req, res) => {
    res.render('createAccessory', {
        title: 'Create',
        isLoggedIn: req.isLoggedIn
    })
})

router.post('/create/accessory', isAuthenticatedJSON, async (req, res) => {
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

router.get('/attach/accessory/:id', isAuthenticated, getUserStates, async (req, res) => {
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
        canAddAccessory: cube.accessories.length !== accessories.length && accessories.length > 0,
        isLoggedIn: req.isLoggedIn
    })
})

router.post('/attach/accessory/:id', isAuthenticatedJSON, async (req, res) => {
    const {
        accessory
    } = req.body

    await updateCubes(req.params.id, accessory)

    res.redirect(`/details/${req.params.id}`)
})

module.exports = router