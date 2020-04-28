require('express-async-errors');

module.exports = function () {
    // Uncaught exception is handled by the winston logger configuration. So following code is not needed
    /*process.on('uncaughtException', (ex) => {
        logger.error('WE GOT AN Uncaught Exception!!', ex);
    });*/

    // Unhandled rejections are not handled by Winston
    process.on('unhandledRejection', (ex) => {
        // So we throw the exception so that Winston catches it as an uncaught exception
        throw ex;
    });
}