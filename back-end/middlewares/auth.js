const jwt = require('jsonwebtoken')
const { sendErrorResponse } = require('../utils/response')

const authenticate = (req, res, next) => {
    const authHeader = req.header('Authorization')

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return sendErrorResponse(res, 401, 'Token de autorização necessário')
    }

    const token = authHeader.split(' ')[1]

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