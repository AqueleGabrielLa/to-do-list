import { useState } from "react"
import { Link, useNavigate } from 'react-router-dom'
import api from "../services/api"
import '../styles/Style.css'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await api.post('/user/login', {
                email,
                password
            })

            const token = response.data.data.token

            if(token){
                localStorage.setItem('token', token)
                setError('')
                navigate('/home')
            } else {
                setError('Token não recebido, tente novamente')
            }
        } catch (error) {
            if(error.response && error.response.data){
                setError(error.response.data.message)
            } else {
                setError('Erro ao fazer login tente novamente')
            }
        }

    }

    return(
        <div className="conteiner">
            <h1>Login</h1>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <input 
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)} 
                />
                <input 
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button type="submit">Entrar</button>
            </form>
            <p>Não tem uma conta? <Link to="/register">Cadastre-se</Link></p>
        </div>
    )
}