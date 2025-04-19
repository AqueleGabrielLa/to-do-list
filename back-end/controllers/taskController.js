const { createTask, getAllTasks, getTaskById, delTask, updateTask } = require("../services/taskService");
const { sendErrorResponse, sendSuccessResponse } = require("../utils/response");
const validateTaskInput = require("../utils/validateTaskInput");
const handleError = require("../utils/handleError");

const validateTaskErrors = new Set([
    'Status inválido, Valores válidos: pending, in_progress, completed',
    'Data de vencimento inválida. Por favor, insira uma data válida no formato YYYY-MM-DD.',
    'Dados insuficientes, favor preencher título'
])

const postTask = async (req, res) => {
    try {
        const { title, description, status, dueDate, categoryId } = req.body;
        const userId = req.user.id

        validateTaskInput({ title, status, dueDate })

        await createTask({ title, description, status, dueDate, userId, categoryId })

        sendSuccessResponse(res, 201, 'Tarefa criada com sucesso')
    } catch (error) {
        if(validateTaskErrors.has(error.message)){
            sendErrorResponse(res, 400, error.message)
        } else {
            handleError(res, 'Erro ao criar tarefa', error);
        }
    }
}

const getTasks = async (req, res) => {
    try {
        const userId = req.user.id

        const result = await getAllTasks({ userId })

        const tasks = result.rows.map(task => ({
            ...task,
            category: task.category_id ? {
                id: task.category_id,
                name: task.category_name
            } : null
        }))

        sendSuccessResponse(res, 200, undefined, tasks)
    } catch (error) {
        handleError(res, 'Erro ao buscar tarefas', error)
    }
}

const getTasksById = async (req, res) => {
    try {
        const { id } = req.params
        const task = await getTaskById({ id })

        sendSuccessResponse(res, 200, null, task)
    } catch (error) {
        if(error.message === 'Tarefa não encontrada')
            sendErrorResponse(res, 404, error.message)
        else 
            handleError(res, 'Erro ao buscar tarefas', error)
    }
}

const putTask = async (req, res) => {
    try {
        const { id } = req.params
        const { title, status, dueDate} = req.body

        const bodyHasData = Object.values(req.body).some(v => v !== undefined && v !== null && v !== '')
        if(!bodyHasData){
            const error = new Error('Nenhum dado fornecido para atualização')
            error.statusCode = 400
            throw error
        }
        
        validateTaskInput({ title, status, dueDate}, true)

        await updateTask({ id }, req.body)

        sendSuccessResponse(res, 200, 'Tarefa atualizada com sucesso')
    } catch (error) {
        if([
            'Tarefa não encontrada',
            'Nenhum dado fornecido para atualização'
        ].includes(error.message)){
            sendErrorResponse(res, error.statusCode, error.message)
        } else if(validateTaskErrors.has(error.message)){
            sendErrorResponse(res, 400, error.message)
        } else {
            handleError(res, 'Erro ao atualizar tarefa', error)
        }
    }
}

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params

        await delTask({ id })

        sendSuccessResponse(res, 200, 'Tarefa deletada com sucesso')
    } catch (error) {
        if(error.message === 'Tarefa não encontrada')
            sendErrorResponse(res, 404, error.message)
        else 
            handleError(res, 'Erro ao deletar tarefa', error)
    }
}

module.exports = {
    postTask,
    getTasks,
    getTasksById,
    putTask,
    deleteTask
}