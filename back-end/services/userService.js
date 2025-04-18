const bcrypt = require('bcrypt')
const pool = require('../config/db')
const jwt = require('jsonwebtoken')

const registerUser = async ({name, email, password}) => {
    if(!name || !email || !password){
        throw new Error('Dados insuficientes, favor preencher nome, email e senha')
    }
    const encryptedPswd = await bcrypt.hash(password, 10)

    await pool.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
        [name, email, encryptedPswd]
    ) 
}

const loginUser = async ({ email, password }) => {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email])
    const user = result.rows[0]

    if(!user) throw new Error('Credenciais inválidas')
    
    const verify = await bcrypt.compare(password, user.password)
    
    if(!verify) throw new Error('Credenciais inválidas')

    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    )

    return token
}

module.exports = {
    registerUser,
    loginUser,
}