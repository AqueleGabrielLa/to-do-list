const jwt = require('jsonwebtoken')
const { sendErrorResponse } = require('../utils/response')

const authenticate = (req, res, next) => {
    const token = req.header('Authorization')

    if(!token){
        return sendErrorResponse(res, 401, 'Token de autorização necessário')
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error){
        console.error('Erro ao autenticar usuário', error)
        return sendErrorResponse(res, 401, 'Token inválido')
    }
}

module.exports = authenticate