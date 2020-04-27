const Joi = require('joi');
const debug = require('debug')('app:study');
const config = require('config');
const express = require('express');
const morgan = require('morgan');

const home = require('./routes/home');
const courses = require('./routes/courses');
const logger = require('./middleware/logger');
const authentication = require('./middleware/authentication');

const app = express();

debug(`App name: ${config.get('name')}`);

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    debug('Morgan enabled...');
    app.use(logger);
    app.use(authentication);
}

// For parsing request body
app.use(express.json());

// Routes
app.use('/', home);
app.use('/api/courses', courses);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}....`);
});