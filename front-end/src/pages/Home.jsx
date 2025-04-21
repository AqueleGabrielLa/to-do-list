import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteButton from "../components/buttons/DeleteButton";
import api from "../services/api";
import '../styles/Style.css'

export default function Home() {
    const [tasks, setTasks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        dueDate: '',
        categoryId: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        fetchTasks();
        fetchCategories();
    }, [navigate]);

    const fetchTasks = async () => {
        try {
            const response = await api.get('/tasks');
            console.log('Tarefas recebidas:', response.data.data)
            setTasks(response.data.data);
        } catch (error) {
            console.error('Erro ao buscar tarefas:', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await api.get('/categories');
            setCategories(response.data.data);
        } catch (error) {
            console.error('Erro ao buscar categorias:', error);
        }
    };

    const handleCategorySubmit = async (e) => {
        e.preventDefault();

        if (!categoryName.trim()) return;

        try {
            await api.post('/categories', { name: categoryName });
            setCategoryName('');
            fetchCategories();
        } catch (error) {
            console.error('Erro ao criar categoria:', error);
        }
    };

    const handleTaskSubmit = async (e) => {
        e.preventDefault();
    
        if (!newTask.title.trim()) return;
    
        try {
            await api.post('/tasks', {
                title: newTask.title,
                description: newTask.description,
                dueDate: newTask.dueDate,
                categoryId: newTask.categoryId ? Number(newTask.categoryId) : null,
                status: 'pending',
            })
            setNewTask({    
                title: '',
                description: '',
                dueDate: '',
                categoryId: '',
            })
            fetchTasks();
        } catch (error) {
            console.error('Erro ao criar tarefa:', error);
        }
    }

    const handleDeleteTask = async (id) => {
        try {
            await api.delete(`/tasks/${id}`);
            fetchTasks();
        } catch (error) {
            console.error('Erro ao deletar tarefa:', error);
        }
    }

    const handleDeleteCategory = async (id) => {
        try {
            await api.delete(`/categories/${id}`);
            fetchCategories()
        } catch (error) {
            console.error('Erro ao deletar categoria:', error);
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="container">
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
                    <button type="submit" disabled={!categoryName.trim()}>
                        Criar Categoria
                    </button>
                </form>
            </section>

            <section>
                <h2>Categorias</h2>
                {categories.length === 0 ? (
                    <p>Você ainda não tem categorias</p>
                ) : (
                    <ul>
                        {categories.map((category) => (
                        <li key={category.id}>
                            {category.name}
                            <DeleteButton onClick={() => handleDeleteCategory(category.id)}>Remover</DeleteButton>
                        </li>
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
                    {tasks.map((task) => (
                        <li key={task.id}>
                            <strong>{task.title}</strong> - {task.category?.name || 'Sem categoria'}<br />
                            <em>{task.description}</em><br />
                            <span>Status: {task.status} </span>
                            <span>
                                Até: {
                                    new Date(task.dueDate || task.due_date).toLocaleDateString()
                                }
                            </span>
                            <DeleteButton onClick={() => handleDeleteTask(task.id)}>Remover</DeleteButton>
                        </li>
                    ))}
                    </ul>
                )}
            </section>

            <section>
                <h2>Criar Tarefa</h2>
                <form onSubmit={handleTaskSubmit}>
                    <input
                        type="text"
                        placeholder="Título"
                        value={newTask.title}
                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    />
                    <textarea
                        placeholder="Descrição"
                        value={newTask.description}
                        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    />
                    <input
                        type="date"
                        value={newTask.dueDate}
                        onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    />
                    <select
                        value={newTask.categoryId || ''}
                        onChange={(e) =>
                            setNewTask({
                            ...newTask,
                            categoryId: e.target.value ? Number(e.target.value) : null
                            })
                        }
                    >
                    <option value="">Sem categoria</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                            {category.name}
                            </option>
                        ))}
                    </select>
                    <button type="submit" disabled={!newTask.title.trim()}>
                        Criar Tarefa
                    </button>
                </form>
            </section>
        </div>
    );
}
