// CUBE CLASS CUBE HAS THE FOLLOWING PARAMS
// ID: Number
// NAME: String
// DESCRIPTION: String
// IMAGE URL: String
// DIFFICULTY LEVEL: Number

const { v4 } = require('uuid')
const fs = require('fs')
const path = require('path')
const dbFile = path.join(__dirname, '..', 'config/database.json')

class Cube {
    constructor(name, description, imgUrl, difficulty) {
        this.id = v4()
        this.name = name || 'Missing Name'
        this.description = description
        this.imgUrl = imgUrl || 'placeholder'
        this.difficulty = difficulty || 0
    }

    // Save Cube
    save() {
        const savedCube = {
            id: this.id,
            name: this.name,
            description: this.description,
            imageUrl: this.imgUrl,
            difficulty: this.difficulty            
        }

        fs.readFile(dbFile, (err, dbData) => {
            if (err) {
                throw err
            }
            const cubes = JSON.parse(dbData)
            console.log(cubes);
            cubes.push(savedCube)

            fs.writeFile(dbFile, JSON.stringify(cubes), error => {
                if (error) {
                    throw error
                }
                console.log('New cube is successfully stored');
            })
        })
    }
}

module.exports = Cube