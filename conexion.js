const mysql = require('mysql')

const cadena = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'comida',
    port: 3306,
}

const pool = mysql.createPool(cadena)
module.exports = pool