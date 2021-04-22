// CUBE CLASS CUBE HAS THE FOLLOWING PARAMS
// ID: Number
// NAME: String
// DESCRIPTION: String
// IMAGE URL: String
// DIFFICULTY LEVEL: Number

const { v4 } = require('uuid')
const fs = require('fs')
const { saveCube } = require('../controllers/database')

class Cube {
    constructor(name, description, imgUrl, difficulty) {
        this.id = v4()
        this.name = name || 'Missing Name'
        this.description = description
        this.imgUrl = imgUrl || 'placeholder'
        this.difficulty = difficulty || 0
    }

    // Save Cube
    save(callback) {
        const savedCube = {
            id: this.id,
            name: this.name,
            description: this.description,
            imageUrl: this.imgUrl,
            difficulty: this.difficulty            
        }
        saveCube(savedCube ,callback)
    }
}

module.exports = Cube