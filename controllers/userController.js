const bcrypt = require('bcrypt')
const pool = require('../config/db')
const jwt = require('jsonwebtoken')
const handleError = require('../utils/handleError')
const { sendSuccessResponse, sendErrorResponse } = require('../utils/response')
    
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if(!name || !email || !password) sendErrorResponse(res, 400, 'Dados insuficientes, favor preencher nome, email e senha')

        const encryptedPswd = await bcrypt.hash(password, 10)

        await pool.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
            [name, email, encryptedPswd]
        )   

        sendSuccessResponse(res, 201, 'Usuário cadastrado')        
    } catch (error) {
        handleError(res, 'Erro ao registrar usuário', error)
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email])
        const user = result.rows[0]

        if(!user) sendErrorResponse(res, 401, 'Credenciais inválidas')
        
        const verify = await bcrypt.compare(password, user.password)
        
        if(!verify) sendErrorResponse(res, 401, 'Credenciais inválidas')

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        )

        sendSuccessResponse(res, 200, 'Login realizado com sucesso', token)
    } catch (error) {
        handleError(res, 'Erro ao acessar usuário', error)
    }
}

module.exports = {
    register,
    login
}