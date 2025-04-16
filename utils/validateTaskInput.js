const { sendErrorResponse } = require('./response')

const validStatus = ['pending', 'in_progress', 'done']

function validateTaskInput(res, { title, statusTask, dueDate }, isUpdate = false){
    if (isUpdate && !title) {
        return sendErrorResponse(res, 400, 'Dados insuficientes, favor preencher título')
    }

    if (statusTask && !validStatus.includes(statusTask)) {
        return sendErrorResponse(res, 400, 'Status inválido, Valores válidos: pending, in_progress, completed')
    }

    if (dueDate && isNaN(Date.parse(dueDate))) {
        return sendErrorResponse(res, 400, 'Data de vencimento inválida. Por favor, insira uma data válida no formato YYYY-MM-DD.')
    }

    return null;
}

module.exports = validateTaskInput;