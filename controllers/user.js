const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const privateKey = 'CUBE-WORKSHOP'

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

    const token = jwt.sign({
        userID: userObj._id,
        username: userObj.username
    }, privateKey)

    res.cookie('aid', token)
    

    console.log(token)

    return true
}

module.exports = {
    saveUser
}