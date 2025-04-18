const pool = require("../config/db")
const handleError = require("../utils/handleError")
const { sendErrorResponse } = require("../utils/response")

const authOwership = (tableName) => async (req, res, next) => {
    const { id } = req.params
    const userId = req.user.id

    try {
        const result = await pool.query(
            `SELECT user_id FROM ${tableName} WHERE id = $1`,
            [id]
        )

        if(result.rowCount === 0) return sendErrorResponse(res, 404, `${tableName.slice(0, -1)} não encontrado(a)`)

        const item = result.rows[0]
        if(item.user_id !== userId){
            return sendErrorResponse(res, 403, 'Sem permissão para essa ação')
        }

        next()
    } catch (error) {
        handleError(res, 'Erro interno no servidor', error)
    }
}


module.exports = authOwership