const express = require ('express')
const { conectar } = require('./bd.js')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validarCookie } = require('./middlewares.js')
const cookie_parser = require('cookie-parser')
require('dotenv').config()

let db = null

const server = express()

server.use(express.json())
server.use(cookie_parser())

server.get('/usuarios', validarCookie, async (req, res) =>{
    const sql = `SELECT * FROM usuarios`
    const dados = await db.all(sql)
    console.log(dados)
    res.status(200).send(dados)
})

server.get('/usuarios/:id', validarCookie, async (req, res) => {
    const id = req.params.id
    const sql = `SELECT * FROM usuarios WHERE id = ?`
    const dados = await db.get(sql, [id])
    if(!dados){
        res.status(404).json({msg: 'Not Found'})
        return
    }
    res.status(200).json(dados)
})

server.post('/usuarios', validarCookie, async (req, res) =>{
    const {nome, cpf, email, senha} = req.body
    const sql = `SELECT nome FROM usuarios WHERE cpf = ? OR email = ?`
    const valores = [cpf, email]
    const resultado = await db.get(sql, valores)
    if(resultado){
        res.status(400).json({msg: "Email ou CPF já cadastrado."})
        return
    }
    //verifiar que a senha atende certos requisitos
    //criptografar a senha do usuario
    const senha_criptografada = bcryptjs.hashSync(senha)
    console.log(senha)
    console.log(senha_criptografada)
    //criar o novo usuario no banco
    const sql2 = `INSERT INTO usuarios (nome, cpf, email, senha) VALUES (?, ?, ?, ?)`
    const valores2 = [nome, email, cpf, senha_criptografada]
    await db.run(sql2, valores2)
    //retornar uma resposta ao cliente
    res.status(201).json({msg:"Criado com sucesso!"})
    console.log(resultado)
    res.send('ok')
})

server.post('/login', async (req, res) => {
    try {
        const {email, senha} = req.body
        //Verificar se o email existe
        const sql = `SELECT * FROM usuarios WHERE email =  ?`
        const valores = [email]
        const resultado = await db.get(sql, valores)
        if(!resultado){
            res.status(404).json({msg:"Not Found"})
            return
        }
        const senha_valida = bcryptjs.compareSync(senha, resultado.senha)
        if(!senha_valida){
            res.status(401).json({msg:"Senha Incorreta"})
            return
        }
        //criar o Token
        const token = jwt.sign(
            //corpo do token
            resultado,
            //chave de criptografia
            process.env.SENHAJWT,
            //tempo de expiração
            {expiresIn: '1d'}
        )
        res.status(200).json({msg:token})

    } catch (error) {
        console.error(error)
        res.status(500).json({msg: "Erro interno no servidor"})
    }
})

server.listen(8080, async () =>{
    console.log('servidor iniciado na porta 8080')
    db = await conectar()
})
