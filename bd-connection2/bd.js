const sqlite = require('sqlite3');
const { open } = require('sqlite');

async function conectar() {
    const db = await open({
        filename: './bd-connection2/teste.db',
        driver: sqlite.Database
    });

    // Criar a tabela 'usuarios' caso não exista
    const createTableSQL = `
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            cpf TEXT NOT NULL UNIQUE,
            email TEXT NOT NULL UNIQUE,
            senha TEXT NOT NULL
        );
    `;
    await db.exec(createTableSQL);

    console.log('Conexão com o banco de dados estabelecida.');
    return db;
}

module.exports = { conectar };