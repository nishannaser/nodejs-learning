const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Home Page');
});

// =====================================================================================================

// EXPORT
module.exports = router;