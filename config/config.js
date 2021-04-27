module.exports = {
    development: {
        port: process.env.PORT || 4000,
        privateKey: 'CUBE-WORKSHOP',
        dataBaseUrl: `mongodb+srv://Blagovest:${process.env.DB_PASSWORD}@cluster0.tljof.mongodb.net/CubicleDB?retryWrites=true&w=majority`
    },
    production: {}
}