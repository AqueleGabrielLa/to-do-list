function sendSuccessResponse(res, statusCode = 200, message = 'Success', data = null){
    const response = {
        success: true,
        message
    }

    if(data !== null){
        response.data = data
    }

    return res.status(statusCode).json(response)
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