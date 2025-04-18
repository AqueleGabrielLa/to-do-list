const { sendSuccessResponse, sendErrorResponse } = require('../utils/response')
const { registerUser, loginUser } = require('../services/userService')
const handleError = require('../utils/handleError')

const register = async (req, res) => {
    try {
        await registerUser(req.body)

        sendSuccessResponse(res, 201, 'Usuário cadastrado')        
    } catch (error) {
        if(error.message === 'Dados insuficientes, favor preencher nome, email e senha')
            sendErrorResponse(res, 400, error.message)
        else
            handleError(res, 'Erro ao registrar usuário', error)
    }
}

const login = async (req, res) => {
    try {
        const token = await loginUser(req.body)

        sendSuccessResponse(res, 200, 'Login realizado com sucesso', token)
    } catch (error) {
        if(error.message === 'Credenciais inválidas')
            sendErrorResponse(res, 401, error.message)
        else 
            handleError(res, 'Erro ao acessar usuário', error)
    }
}

module.exports = {
    register,
    login
}