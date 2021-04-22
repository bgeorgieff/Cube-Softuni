const fs = require('fs')
const path = require('path')

const dbFile = path.join(__dirname, '..', 'config/database.json')

const saveCube = (cube, callback) => {
    getCubes((cubes) => {
        cubes.push(cube)

        fs.writeFile(dbFile, JSON.stringify(cubes), error => {
            if (error) {
                throw error
            }
            console.log('New cube is successfully stored')
            callback()
        })
    })  
}

const getCube = (id, callback) => {
    getCubes(cubes => {
        const cube = cubes.filter(c => c.id === id)[0]
        callback(cube)
    })
}

getCubes = (callback) => {
    fs.readFile(dbFile, (err, dbData) => {
        if (err) {
            throw err
        }
        const cubes = JSON.parse(dbData)
        callback(cubes)
    })
}

module.exports = {
    getCube,
    getCubes,
    saveCube
}