const Cube = require('../models/cube')

const newCube = new Cube('Gan356 Air SM', 'this is a default cube', 'https://ae01.alicdn.com/kf/HTB1CSddXRxRMKJjy0Fdq6yifFXa6/Gan-356-Air-SM-3x3-Black-Magic-cube-GAN-Air-SM-Magnetic-3x3x3-Speed-cube-gans.jpg', 5)
const newCube1 = new Cube('Eco-Dark', 'another default cube', 'https://thingsidesire.com/wp-content/uploads/2018/06/Eco-Dark-Rubik%E2%80%99s-Cube2.jpg', 8)
const newCube2 = new Cube('Pyraminx', 'another default cube1', 'https://images-na.ssl-images-amazon.com/images/I/61izOzq%2BBAL._SY355_.jpg', 2)
const newCube3 = new Cube('Megaminx', 'another default cube2', 'https://images-na.ssl-images-amazon.com/images/I/61HpQqVQ37L._SY355_.jpg', 10)

// newCube.save()
// newCube1.save()
// newCube2.save()
newCube3.save()