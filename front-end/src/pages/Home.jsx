import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

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

        fetchTasks()
        fetchCategories()
    }, [navigate])

    const fetchTasks = async () => {
        try {
            const response = await api.get('/tasks')
            setTasks(response.data.data)
        } catch (error) {
            console.error('Erro ao buscar tarefas:', error)
        }
    }
    const fetchCategories = async () => {
        try{
            const response = await api.get('/categories')
            setCategories(response.data.data)
        } catch (error){
            console.error('Erro ao buscar categorias:', error)
        }
    }

    const handleCategorySubmit = async (e) => {
        e.preventDefault()

        if(!categoryName.trim()) return

        try {
            await api.post('/categories', {
                name: categoryName
            })
            setCategoryName('')
            fetchCategories()
        } catch (error) {
            console.error('Erro ao criar categoria: ', error)
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <div>
            <h1>Minhas Tarefas</h1>
            <button onClick={handleLogout}>Sair</button>
            <section>
                <h2>Criar Categoria</h2>
                <form onSubmit={handleCategorySubmit}>
                    <input
                        type="text"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        placeholder="Nome da Categoria"
                    />
                    <button type="submit" disabled={!categoryName.trim()}>Criar Categoria</button>
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