const Pool = require('pg').Pool
const pool = new Pool({
    user: "postgres",
    password: "12321",
    host: "localhost",
    port: 6666,
    database: "mydb"
})

module.exports = pool