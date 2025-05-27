const express = require ('express')
const { conectar } = require('./bd.js')

const db = null

const server = express()

server.use(express.json)

server.get('/usuarios', async (req, res) =>{
    const sql = `SELECT * FROM usuarios`
    const dados = db.all(sql)
    console.log(dados)
    res.status(200).send(dados)
})

server.get('/usuarios/:id', async (req, res) => {
    const id = req.params.id
    const sql = `SELECT * FROM usuarios WHERE id = ?`
    const dados = await db.get(sql, [id])
    if(!dados){
        res.status(404).json({msg: 'Not Found'})
        return
    }
    res.status(200).json(dados)
})

server.listen(8080, async () =>{
    console.log('servidor iniciado na porta 8080')
    db = await conectar()

    console.log(db)
})
