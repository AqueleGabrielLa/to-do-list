const pool = require("../utils/db");
const handleError = require("../utils/handleError");

const createTask = async (req, res) => {
    try {
        const { title, description, statusTask, dueDate, categoryId } = req.body;

        if (!title) {
            return res.status(400).json({
                success: false,
                message: 'Dados insuficientes, favor preencher título'
            });
        }

        const validStatus = ['pending', 'in_progress', 'done'];
        if (statusTask && !validStatus.includes(statusTask)) {
            return res.status(400).json({
                success: false,
                message: 'Status inválido, Valores válidos: pending, in_progress, completed'
            });
        }

        if (dueDate && isNaN(Date.parse(dueDate))) {
            return res.status(400).json({
                success: false,
                message: 'Data de vencimento inválida. Por favor, insira uma data válida no formato YYYY-MM-DD.'
            });
        }

        const userId = req.user.id;
        const taskStatus = statusTask || 'pending'
        await pool.query(
            "INSERT INTO tasks (title, description, status, due_date, user_id, category_id) VALUES  ($1, $2, $3::task_status, $4, $5, $6)",
            [title, description, taskStatus, dueDate, userId, categoryId]
        );

        res.status(201).json({
            success: true,
            message: 'Tarefa criada com sucesso'
        });
    } catch (error) {
        handleError(res, 'Erro ao criar tarefa', error);
    }
}

const getTasks = async (req, res) => {
    try {
        const userId = req.user.id
        const result = await pool.query(
            'SELECT * FROM tasks WHERE user_id = $1 ORDER BY id',
            [userId]
        )

        res.status(200).json({
            success: true,
            tasks: result.rows
        })
    } catch (error) {
        handleError(res, 'Erro ao buscar tarefas', error)
    }
}

const getTasksById = async (req, res) => {

    try {
        const { id } = req.params

        const result = await pool.query(
            'SELECT * FROM tasks WHERE id = $1',
            [id]
        )

        if (!result.rows[0]) {
            return res.status(404).json({
                success: false,
                message: 'Tarefa não encontrada'
            })
        }

        res.status(200).json({
            success: true,
            task: result.rows[0]
        })   
    } catch (error) {
        handleError(res, 'Erro ao buscar tarefas', error)
    }
}

const updateTask = async (req, res) => {
    try {
        const { id } = req.params
        const result = await pool.query(
            'SELECT * FROM tasks WHERE id = $1',
            [id]
        )

        if(!result.rows[0]){
            return res.status(404).json({
                success: false,
                message: 'Tarefa não encontrada'
            })
        }

        const { title, description, status, dueDate, categoryId } = req.body
        if (
            title === undefined &&
            description === undefined &&
            status === undefined &&
            dueDate === undefined &&
            categoryId === undefined
        ) {
            console.log(status);
            return res.status(400).json({
                success: false,
                message: 'Nenhum dado fornecido para atualização'
            })
        }

        const validStatus = ['pending', 'in_progress', 'done']
        if(status && !validStatus.includes(status)){
            return res.status(400).json({
                success: false,
                message: 'Status inválido, Valores válidos: pending, in_progress, done'
            })
        }

        if(dueDate && isNaN(Date.parse(dueDate))){
            return res.status(400).json({
                success: false,
                message: 'Data de vencimento inválida'
            })
        }

        const campos = { title, description, status: status, due_date: dueDate, category_id: categoryId}
        const fields = []
        const values = []
        let idx = 1

        for(const [key, value] of Object.entries(campos)){
            if(value !== undefined){
                fields.push(`${key} = $${idx++}`)
                values.push(value)
            }
        }

        values.push(id)
        const query = `UPDATE tasks SET ${fields.join(', ')} WHERE id = $${idx}`
        
        console.log(query, values)
        await pool.query(query, values)

        res.status(200).json({
            success: true,
            message: 'Tarefa atualizada com sucesso'
        })
    } catch (error) {
        handleError(res, 'Erro ao atualizar tarefa', error)
    }
}

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params

        const result = await pool.query(
            'SELECT * FROM tasks WHERE id = $1',
            [id]
        )

        if(!result.rows[0]){
            return res.status(404).json({
                success: false,
                message: 'Tarefa não encontrada'
            })
        }

        await pool.query(
            'DELETE FROM tasks WHERE id = $1',
            [id]
        )

        res.status(200).json({
            success: true,
            message: 'Tarefa deletada com sucesso'
        })   
    } catch (error) {
        handleError(res, 'Erro ao deletar tarefa', error)
    }
}

module.exports = {
    createTask,
    getTasks,
    getTasksById,
    updateTask,
    deleteTask
}