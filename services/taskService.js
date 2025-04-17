const pool = require("../config/db");

const createTask = async ({ title, description, status, dueDate, userId, categoryId}) => {
    const taskStatus = status || 'pending'
    await pool.query(
        "INSERT INTO tasks (title, description, status, due_date, user_id, category_id) VALUES  ($1, $2, $3::task_status, $4, $5, $6)",
        [title, description, taskStatus, dueDate, userId, categoryId]
    );
}

const getAllTasks = async ({ userId }) => {
    const result = await pool.query(
        'SELECT * FROM tasks WHERE user_id = $1 ORDER BY id',
        [userId]
    )

    return result
}

const getTaskById = async ({ id }) => {
    const result = await pool.query(
        'SELECT * FROM tasks WHERE id = $1',
        [id]
    )

    if (!result.rows[0]) throw new Error('Tarefa não encontrada') 

    return result.rows[0]
}

const updateTask = async ({ id }, body) => {
    const result = await pool.query(
        'SELECT * FROM tasks WHERE id = $1',
        [id]
    )

    if(!result.rows[0]) {
        const error = new Error('Tarefa não encontrada')
        error.statusCode = 404
        throw error
    }

    const { title, description, status, dueDate, categoryId } = body

    const campos = { title, description, status, due_date: dueDate, category_id: categoryId}
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
}

const delTask = async ({ id }) => {
    const result = await pool.query(
        'SELECT * FROM tasks WHERE id = $1',
        [id]
    )

    if(!result.rows[0]) throw new Error('Tarefa não encontrada')

    await pool.query(
        'DELETE FROM tasks WHERE id = $1',
        [id]
    )
}

module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    delTask
}