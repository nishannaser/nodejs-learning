const { createLogger, transports, format } = require('winston');
require('winston-mongodb');

// Create logger
module.exports = createLogger({
    level: 'info',
    format: format.json(),
    transports: [
        new transports.File({ filename: 'logfile.log' }),
        // new winston.transports.Console(),
        new transports.MongoDB({
            db: 'mongodb://localhost/vidly',
            options: {
                useNewUrlParser: true,
                useUnifiedTopology: true
            },
            level: 'info'
        })
    ],
    exceptionHandlers: [
        new transports.File({ filename: 'exceptions.log' }),
        new transports.Console({ colorMode: true }),
    ]
});