function sendSuccessResponse(res, statusCode = 200, message = 'Succes', data = {}){
    return res.status(statusCode).json({
        success: true,
        message,
        ...data && { data }
    })
}

function sendErrorResponse(res, statusCode = 400, message = 'Something went wrong'){
    return res.status(statusCode).json({
        success: false,
        message: message
    })  
}

module.exports = {
    sendSuccessResponse,
    sendErrorResponse
}