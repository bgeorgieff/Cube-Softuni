module.exports = {
    development: {
        port: process.env.PORT,
        privateKey: process.env.PRIVATE_KEY,
        dataBaseUrl: process.env.DATABASE_URL
    },
    production: {}
}