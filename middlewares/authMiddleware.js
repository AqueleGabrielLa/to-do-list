const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {
    const token = req.header('Authorization')

    if(!token){
        return res.status(401).json({
            success: false,
            message: 'Token de autorização necessário'
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error){
        console.error('Erro ao autenticar usuário', error)
        res.status(401).json({
            success: false,
            message: 'Token inválido'
        })
    }
}

module.exports = authenticate