const pool = require("../config/db");
const handleError = require("../utils/handleError");
const { sendErrorResponse, sendSuccessResponse } = require("../utils/response");
const validateTaskInput = require("../utils/validateTaskInput");

const createTask = async (req, res) => {
    try {
        const { title, description, statusTask, dueDate, categoryId } = req.body;

        const error = validateTaskInput(res, { title, statusTask, dueDate })
        if(error) return

        const userId = req.user.id;
        const taskStatus = statusTask || 'pending'
        await pool.query(
            "INSERT INTO tasks (title, description, status, due_date, user_id, category_id) VALUES  ($1, $2, $3::task_status, $4, $5, $6)",
            [title, description, taskStatus, dueDate, userId, categoryId]
        );

        sendSuccessResponse(res, 201, 'Tarefa criada com sucesso')
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

        sendSuccessResponse(res, 200, null, result.rows)
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

        if (!result.rows[0]) return sendErrorResponse(res, 404, 'Tarefa não encontrada')

        sendSuccessResponse(res, 200, null, result.rows[0])
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

        if(!result.rows[0]) return sendErrorResponse(res, 404, 'Tarefa não encontrada')

        const { title, description, status, dueDate, categoryId } = req.body
        if(Object.keys(req.body).length === 0){
            return sendErrorResponse(res, 400, 'Nenhum dado fornecido para atualização')
        }

        const error = validateTaskInput(res, { title, status, dueDate}, true)
        if(error) return

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

        sendSuccessResponse(res, 200, 'Tarefa atualizada com sucesso')
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

        if(!result.rows[0]) return sendErrorResponse(res, 404, 'Tarefa não encontrada')

        await pool.query(
            'DELETE FROM tasks WHERE id = $1',
            [id]
        )

        sendSuccessResponse(res, 200, 'Terefa deletada com sucesso')
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