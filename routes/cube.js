const env = process.env.NODE_ENV || 'development'

const express = require('express')
const { getCubeWithAccesssories, getAllCubes } = require('../controllers/cubes')
const Cube = require('../models/cube')
const { isAuthenticated, getUserStates, isAuthenticatedJSON } = require('../controllers/user')
const jwt = require('jsonwebtoken')
const config = require('../config/config')[env]
const { deleteOne } = require('../models/cube')

const router = express.Router()

router.get('/create', isAuthenticated, getUserStates, (req, res) => {
    res.render('create', {
        title: 'Create a new cube',
        isLoggedIn: req.isLoggedIn
    })
})

router.post('/create', isAuthenticatedJSON, (req, res) => {
    const {
        name, 
        description,
        imageUrl,
        difficultyLevel
    } = req.body

    const token = req.cookies['aid']
    const decodedObj = jwt.verify(token, config.privateKey)

    const cube = new Cube({name, description, imageUrl, difficulty: difficultyLevel, creatorID: decodedObj.userID})
    
    cube.save((err) => {
        if (err) {
            console.error(err)
            res.redirect('/create')
        } else {
            res.redirect('/')
        }
    })
})

router.get('/details/:id', getUserStates, async (req, res) => {
    const cube = await getCubeWithAccesssories(req.params.id)

    res.render('details', {
        title: 'Cube details',
        ...cube,
        isLoggedIn: req.isLoggedIn
    })
})

router.get('/edit', isAuthenticated, getUserStates, (req, res) => {
    res.render('editCubePage', {
        isLoggedIn: req.isLoggedIn
    })
})

router.get('/delete/:id', isAuthenticated, getUserStates, async (req, res) => {
    const cube = await getCubeWithAccesssories(req.params.id)

    res.render('deleteCubePage', {
        isLoggedIn: req.isLoggedIn,
        ...cube
    })
})

router.post('/delete/:id', isAuthenticatedJSON, async (req, res) => {
    const cubes = await getCubeWithAccesssories(req.params.id)

    Cube.findByIdAndRemove({_id: cubes._id}, () => {
        res.redirect('/')
    })
})

module.exports = router