const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    // Read header
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. No token provided.');

    try {
        // Verify the token
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        // Set it as a header in the request
        req.user = decoded;
        // Pass the control to next function
        next();
    } catch (ex) {
        res.status(400).send('Invalid token.');
    }
}