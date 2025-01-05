function logger(req, res, next) {
    console.log('logger middleware')
    next()
}

function validateUserId(req, res, next) {
    console.log('validateUserId middleware')
    next()
}



module.exports = {
    logger,
    validateUserId,

}