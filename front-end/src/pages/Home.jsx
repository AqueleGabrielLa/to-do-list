import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home(){
    const [tasks, setTasks] = useState([])
    const [categories, setCategories] = useState([])
    const [categoryName, setCategoryName] = useState('');
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(!token){
            navigate('/login')
            return
        }

        fetchTasks(token)
        fetchCategories(token)
    }, [navigate])

    const fetchTasks = async (token) => {
        const res = await fetch('http://localhost:3000/tasks', {
            method: 'GET',
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })

        const response = await res.json()
        setTasks(response.data || [])
    }

    const fetchCategories = async (token) => {
        const res = await fetch('http://localhost:3000/categories', {
            headers: { Authorization: `Bearer ${token}`}
        })

        const response = await res.json()
        setCategories(response.data || [])
    }

    const handleCategorySubmit = async (e) => {
        e.preventDefault()

        const token = localStorage.getItem('token')
        const res = fetch('http://localhost:3000/categories', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: categoryName})
        })

        const response = await res.json()
        if(response.success){
            setCategories((prev) => [...prev, response.data])
            setCategoryName('')
        } else {
            alert('Erro ao criar categoria');
        }
    }

    return (
        <div>
            <h1>Minhas Tarefas</h1>

            <section>
                <h2>Criar Categoria</h2>
                <form onSubmit={handleCategorySubmit}>
                    <input
                        type="text"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        placeholder="Nome da Categoria"
                    />
                    <button type="submit">Criar Categoria</button>
                </form>
            </section>

            <section>
                <h2>Categorias</h2>
                {categories.length === 0 ? (
                    <p>Você ainda não tem categorias</p>
                ) : (
                    <ul>
                        {categories.map((category) => (
                            <li key={category.id}>{category.name}</li>
                        ))}
                    </ul>
                )}
            </section>

            <section>
                <h2>Tarefas</h2>
                {tasks.length === 0 ? (
                    <p>Você ainda não tem tarefas</p>
                ) : ( 
                    <ul>
                    {tasks.map(task => (
                        <li key={task.id}>
                            <strong>{task.title}</strong> - {task.category?.name || 'Sem categoria'}<br />
                            <em>{task.description}</em><br />
                            <span>Status: {task.status} </span>
                            <span>Até: {new Date(task.due_date).toLocaleDateString()}</span>
                        </li>
                    ))}
                    </ul>
                )}
            </section>
        </div>
    )
}