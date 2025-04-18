const validStatus = ['pending', 'in_progress', 'done']

function validateTaskInput({ title, status, dueDate }, isUpdate = false){
    if (status && !validStatus.includes(status)) {
        throw new Error('Status inválido, Valores válidos: pending, in_progress, completed')
    }

    if (dueDate && isNaN(Date.parse(dueDate))) {
        throw new Error('Data de vencimento inválida. Por favor, insira uma data válida no formato YYYY-MM-DD.')
    }

    if (!isUpdate && (!title || title.trim() === '')) {
        throw new Error('Dados insuficientes, favor preencher título')
    }
}

module.exports = validateTaskInput;