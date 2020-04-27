const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const debug = require('debug')('app:vidly');
const config = require('config');
const morgan = require('morgan');
const express = require('express');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');

const app = express();

if (!config.get('jwtPrivateKey')) {
    console.error('jwtPrivateKey is not defined!');
    process.exit(1);
}

// Some debug/startup messages
debug(`Application name: ${config.get('name')}`);
debug(`Mail Server: ${config.get('mail.server')}`);
debug(`Mail Password: ${config.get('mail.password')}`);
if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    debug('Morgan enabled...');
}

// Connect to DB
const dbName = 'vidly';
mongoose.connect(`mongodb://localhost/${dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(() => console.log(`Connected to database "${dbName}"`))
    .catch(err => console.error('Could not connect to mongodb'));

// For parsing request body
app.use(express.json());

// Routes
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));