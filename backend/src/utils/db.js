const {Pool} = require('pg');
require('dotenv').config({path:'../../../.env'})

const db = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '12345',
    database: 'Moviles',
    port: '5432',
    max: 10,
    min: 1
})

module.exports = db;