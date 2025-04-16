const pool = require("../utils/db")
const handleError = require("../utils/handleError")

const getCategories = async (req, res) => {
    try {
        const userId = req.user.id

        const result = await pool.query(
            'SELECT * FROM categories WHERE user_id = $1',
            [userId]
        )

        res.status(200).json({
            success: true,
            categories: result.rows
        })
    } catch (error) {
        handleError(res, 'Errp ap buscar categorias', error)
    }
}

const createCategory = async (req, res) => {
    try {
        const { name } = req.body
        if(!name) {
            return res.status(400).json({
                success: false,
                message: 'Dados insuficientes, favor preencher nome'
            })
        }

        await pool.query(
            'INSERT INTO categories (name, user_id) VALUES ($1, $2)',
            [name, req.user.id]
        )

        res.status(201).json({
            success: true,
            message: 'Categoria adicionada'
        })
    } catch (error) {
        handleError(res, 'Erro ao criar categoria', error)
    }
}

const updateCategory = async (req, res) => {
    try {
        const id = req.params.id
        const { name } = req.body

        if(!name){
            return res.status(400).json({
                success: false,
                message: 'nome da categoria é obrigatório'
            })
        }

        await pool.query(
            'UPDATE categories SET name = $1 WHERE id  = $2',
            [name, id]
        )

        res.status(200).json({
            success: true,
            message: 'categoria atualizada'
        })
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

        if(!result.rows[0]){
            return res.status(404).json({
                success: false,
                message: 'categoria não encontrada'
            })
        }

        await pool.query(
            'DELETE FROM categories WHERE id = $1',
            [id]
        )

        res.status(200).json({
            success: true,
            message: 'categoria deletada com sucesso'
        })
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