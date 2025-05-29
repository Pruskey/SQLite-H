const jwt = require('jsonwebtoken')


function validarCookie(req, res, next){
    try {
    const token = req.cookie.Token
    const verificado = jwt.verify(token, "CHAVESEGURA")
    if(!verificado){
        res.status(401).json({msg: "Usuário não autenticado."})
        return
    }
    next()
} catch (err){
    res.status(401).json({msg: "Usuário não autenticado."})
}
}