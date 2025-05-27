const sqlite = require('sqlite3')
const { open } = require('sqlite')

function conectar () {
const db = open ({
    filename:'./bd-connection2/teste.db',
    driver: sqlite.Database
}) 
    console.log(db)
    return db
}
    module.exports = conectar()