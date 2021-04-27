const env = process.env.NODE_ENV || 'development'

const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config/config')[env]

const generateToken = data => {
    const token = jwt.sign(data, config.privateKey)

    return token
}

const saveUser = async (req, res) => {
    const {
        username,
        password
    } = req.body

    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(password, salt)

    const user = new User ({
        username,
        password: hashedPass
    })

    const userObj = await user.save()

    const token = generateToken({
        userID: userObj._id,
        username: userObj.username
    })

    res.cookie('aid', token)

    return true
}

const verifyUser = async (req, res) => {
    const {
        username,
        password
    } = req.body    

    const user = await User.findOne({username})

    const status = await bcrypt.compare(password, user.password)

    if (status) {
        const token = generateToken({
            userID: user._id,
            username: user.username
        })
        res.cookie('aid', token)
    }

    return status
}

module.exports = {
    saveUser,
    verifyUser
}