const pool = require("../utils/db")
const handleError = require("../utils/handleError")
const { sendSuccessResponse, sendErrorResponse } = require("../utils/response")

const createCategory = async (req, res) => {
    try {
        const { name } = req.body
        if(!name) return sendErrorResponse(res, 400, 'Dados insuficientes, favor preencher nome')

        await pool.query(
            'INSERT INTO categories (name, user_id) VALUES ($1, $2)',
            [name, req.user.id]
        )

        sendSuccessResponse(res, 201, 'Categoria adicionada')
    } catch (error) {
        handleError(res, 'Erro ao criar categoria', error)
    }
}

const getCategories = async (req, res) => {
    try {
        const userId = req.user.id

        const result = await pool.query(
            'SELECT * FROM categories WHERE user_id = $1',
            [userId]
        )

        sendSuccessResponse(res, 200, null, result.rows)
    } catch (error) {
        handleError(res, 'Erro ao buscar categorias', error)
    }
}

const updateCategory = async (req, res) => {
    try {
        const id = req.params.id
        const { name } = req.body

        if(!name) return sendErrorResponse(res, 400, 'nome da categoria é obrigatório')

        await pool.query(
            'UPDATE categories SET name = $1 WHERE id  = $2',
            [name, id]
        )

        sendSuccessResponse(res, 200, 'Categoria atualizada')
    } catch (error) {
        handleError(res, 'Erro ao atualizar categoria', error)
    }
}

const deleteCategory = async (req, res) => {
    try {
        const id = req.params.id
        const result = await pool.query(
            'SELECT * FROM categories WHERE id = $1',
            [id]
        )

        if(!result.rows[0]) return sendErrorResponse(res, 404, 'categoria não encontrada')

        await pool.query(
            'DELETE FROM categories WHERE id = $1',
            [id]
        )

        sendSuccessResponse(res, 200, 'Categoria deletada com sucesso')
    } catch (error) {
        handleError(res, 'Erro ao deletear categoria', error)
    }
}

module.exports = {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory
}