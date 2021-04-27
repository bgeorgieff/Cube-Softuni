const accessory = require('../models/accessory')
const Cube = require('../models/cube')

const getAllCubes = async () => {
    const cubes = await Cube.find().lean()
    return cubes
}

const getCube = async (id) => {
    const cube = await Cube.findById(id).lean()
    return cube
}

const updateCubes = async (cubeId, accessoryId) => {
    await Cube.findByIdAndUpdate(cubeId, {
        $addToSet: {
            accessories: [accessoryId]
        }
    })
}

const getCubeWithAccesssories = async (id) => {
    const cube = await Cube.findById(id).populate('accessories').lean()
    return cube
}


module.exports = {
    getAllCubes,
    getCube, 
    updateCubes,
    getCubeWithAccesssories
}