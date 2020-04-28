const mongoose = require('mongoose');
const logger = require('../util/logger');

// Connect to DB
const dbName = 'vidly';
module.exports = function () {
    mongoose.connect(`mongodb://localhost/${dbName}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
        .then(() => logger.info(`Connected to database "${dbName}"`));
    // .catch() is purposefully ignored. So an unhandled Promise rejection will be thrown & handled by Winston
}