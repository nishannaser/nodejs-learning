const logger = require('./util/logger');
const config = require('config');
const morgan = require('morgan');
const express = require('express');

const app = express();

// Startup
require('./startup/logging');
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();

// Simulating Uncaught exception
// Commenting this as Winston will exit the process after logging uncaught exception
// throw new Error('Something failed during startup!');

// Simulating unhandled rejection
// const p = Promise.reject('Some unhandled promise rejection!!');
// p.then((result) => console.log('Result', result));

// Some debug/startup messages
logger.info(`Application name: ${config.get('name')}`);
logger.debug(`Mail Server: ${config.get('mail.server')}`);
logger.debug(`Mail Password: ${config.get('mail.password')}`);
if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    logger.debug('Morgan enabled...');
}

// For parsing request body
app.use(express.json());

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => logger.info(`Listening on port ${port}...`));
