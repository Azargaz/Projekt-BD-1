/**
 * Połączenie z serwerem bazo danowym, moduł jest używany przez inne moduły łączące się z bazą.
 * @module bd/polaczenie
 */

 const Pool = require('pg').Pool
const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_USER_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
})

module.exports = pool;