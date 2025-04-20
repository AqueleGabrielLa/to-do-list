import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../services/api'

export default function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await api.post('/user/register',
                name,
                email,
                password
            )

            setSuccess(response.data.message)
            setError('')

            setTimeout(() => navigate('login'), 2000)
        } catch (error) {
            if(error.response && error.response.data){
                setError(error.response.data.message)
            } else {
                setError('Erro ao registrar, tente novamente')
            } 
            setSuccess('')
        }
    }

    return(
        <div>
            <h1>Cadastro</h1>

            {success && <p style={{ color: 'green' }}>{success}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    placeholder="Nome"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
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
                <button type="submit">Registrar</button>
            </form>
            <p>Já tem uma conta? <Link to="/login">Faça login</Link></p>
        </div>
    )
}