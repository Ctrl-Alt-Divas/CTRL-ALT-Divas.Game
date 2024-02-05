const express = require('express');
const router = express.Router();

router.use('/players', require('./players'));

// need to add for characters and auth

module.exports = router;
