import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const res = await fetch('http://localhost:3000/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        })

        const data = await res.json()
        console.log(data);

        if (!res.ok) {
            alert(data.message || 'Erro ao registrar')
            return
        }

        alert('Usuário registrado com sucesso!')
        navigate('/login')
    }

    return(
        <div>
            <h1>Cadastro</h1>
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