const { sendSuccessResponse, sendErrorResponse } = require("../utils/response")
const { createCategory, getAllCategories, updateCategory, delCategory } = require('../services/categoryService')
const handleError = require("../utils/handleError")

const postCategory = async (req, res) => {
    try {
        const { name } = req.body
        const userId = req.user.id
        await createCategory({ name, userId })
    
        sendSuccessResponse(res, 201, 'Categoria adicionada')
    } catch (error) {
        if(error.message === 'Dados insuficientes, favor preencher nome')
            sendErrorResponse(res, 400, error.message)
        else 
            handleError(res, 'Erro ao criar categoria', error)
    }
}

const getCategories = async (req, res) => {
    try {
        const userId = req.user.id 
        const result = await getAllCategories({ userId })

        sendSuccessResponse(res, 200, null, result.rows)
    } catch (error) {
        handleError(res, 'Erro ao buscar categorias', error)
    }
}

const putCategory = async (req, res) => {
    try {
        const id = req.params.id
        const { name } = req.body

        await updateCategory({ id, name })

        sendSuccessResponse(res, 200, 'Categoria atualizada')
    } catch (error) {
        if(error.message === 'nome da categoria é obrigatório')
            return sendErrorResponse(res, 400, error.message)
        else 
            handleError(res, 'Erro ao atualizar categoria', error)
    }
}

const deleteCategory = async (req, res) => {
    try {
        const id = req.params.id

        await delCategory({ id })

        sendSuccessResponse(res, 200, 'Categoria deletada com sucesso')
    } catch (error) {
        if(error.message === 'categoria não encontrada')
            sendErrorResponse(res, 404, 'categoria não encontrada')
        else
            handleError(res, 'Erro ao deletear categoria', error)
    }
}

module.exports = {
    getCategories,
    postCategory,
    putCategory,
    deleteCategory
}