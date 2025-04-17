const pool = require("../config/db")

const createCategory = async ({ name , userId}) => {
    if(!name) throw new Error('Dados insuficientes, favor preencher nome')

    await pool.query(
        'INSERT INTO categories (name, user_id) VALUES ($1, $2)',
        [name, userId]
    )
}

const getAllCategories = async ({ userId }) => {
    const result = await pool.query(
        'SELECT * FROM categories WHERE user_id = $1',
        [userId]
    )

    return result
}

const updateCategory = async ({ id, name }) => {
    if(!name) throw new Error('nome da categoria é obrigatório')

    await pool.query(
        'UPDATE categories SET name = $1 WHERE id  = $2',
        [name, id]
    )
}

const delCategory = async ({ id }) => {
    const result = await pool.query(
        'SELECT * FROM categories WHERE id = $1',
        [id]
    )

    if(!result.rows[0]) throw new Error('categoria não encontrada')

    await pool.query(
        'DELETE FROM categories WHERE id = $1',
        [id]
    )
}

module.exports = {
    createCategory,
    getAllCategories,
    updateCategory,
    delCategory
}