const jwt = require('jsonwebtoken')


function validarCookie(req, res, next){
    try {
    const token = req.cookies.Token
    const verificado = jwt.verify(token, process.env.SENHAJWT)
    if(!verificado){
        res.status(401).json({msg: "Usuário não autenticado."})
        return
    }
    next()
} catch (err){
    res.status(401).json({msg: "Usuário não autenticado."})
}
}

module.exports = { validarCookie}