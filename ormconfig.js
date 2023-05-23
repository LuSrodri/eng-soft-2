require('dotenv').config()

if (process.env.ENVIRON === "DEV") {
    module.exports = {
        type: 'postgres',
        host: 'db',
        port: 5432,
        username: 'root',
        password: '1234567',
        database: 'engsoft',
        autoLoadEntities: true,
        autoLoadModels: true,
        synchronize: true,
    }
}
else {
    module.exports = {
        type: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        autoLoadEntities: true,
    }
}