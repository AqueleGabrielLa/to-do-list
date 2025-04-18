module.exports = (res, message, error = null, status = 500) => {
    console.error(message, error?.message || error);
    return res.status(status).json({
        success: false,
        message,
        error: error?.message || error
    })
}