const bcrypt = require('bcrypt')
const pool = require('../utils/db')
const jwt = require('jsonwebtoken')
    
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if(!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Dados insuficientes, favor preencher nome, email e senha'
            })
        }

        const encryptedPswd = await bcrypt.hash(password, 10)

        await pool.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
            [name, email, encryptedPswd]
        )   

        res.status(201).json({
            success: true,
            message: 'Usuário cadastrado'
        })
        
    } catch (error) {
        console.error("Erro ao registrar usário", error);
        res.status(500).json({
            success: false,
            message: 'Erro ao criar usuário',
            error: error.message
        })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email])
        const user = result.rows[0]
        if(!user) {
            return res.status(401).json({
                success: false,  
                message: 'Credenciais inválidas'
            })
        }
        
        const verify = await bcrypt.compare(password, user.password)
        
        if(verify){
            const token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES_IN }
            )

            res.status(200).json({
                success: true,
                message: 'Login realizado com sucesso',
                token
            })
        } else {
            return res.status(401).json({
                success: false,
                message: 'Credenciais inválidas'
            })
        }

    } catch (error) {
        console.error("Erro ao acessar usuário", error);
        res.status(500).json({
            success: false,
            message: 'Erro ao acessar usuário',
            error: error.message
        })
    }
}

module.exports = {
    register,
    login
}