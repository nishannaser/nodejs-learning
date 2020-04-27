const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validate } = require('../models/user');
const express = require('express');
const router = express.Router();

// Current user's information
router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});

// Create (Register) a user
router.post('/', async (req, res) => {

    // Validate input
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check if user already exists
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered!');

    // Save new user
    try {
        user = new User(_.pick(req.body, ['name', 'email', 'password']));
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();

        // Generate JWT and send it as header in the response. Header name can be anything. Start with "x-"
        res.header('x-auth-token', user.generateAuthToken())
            .send(_.pick(user, ['_id', 'name', 'email']));
    } catch (e) {
        return res.status(500).send(e.message);
    }
});

module.exports = router;
