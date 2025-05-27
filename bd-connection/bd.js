const sqlite = require ('sqlite3')

const db = new sqlite.Database('./bd-connection/teste.db', (err) => {
    console.log(err)
})

/*let sql = `CREATE TABLE IF NOT EXISTS usuarios(
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    nome TEXT,
    cpf TEXT UNIQUE,
    email TEXT UNIQUE
    )`

    db.exec(sql, (err) => {console.log(err)})*/

    let sql2 = `INSERT INTO usuarios (nome, cpf, email) VALUES (?, ?, ?)`

    db.run(sql2,
        ['Bruno', '12341231421', 'bruno_pra@estudante.sesisenai.org.br'], 
        (data, err) => {
        if (err){
            console.log(err)
            return
        } 
        console.log(data)
    })

    let sql3 = `SELECT * FROM usuarios`
    db.all(sql3, (dados, err) =>{
        if (err) {
            console.log(err)
            return
        }
        console.log(dados)
    })