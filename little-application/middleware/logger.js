// @desc    Logs request consol
const logger = (req, res, next) => {
    console.log(
        `${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`)
    next()
};

module.exports = logger;