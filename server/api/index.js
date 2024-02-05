const express = require('express')
const router = express.Router()

router.use('/login', require('./auth'))
router.use('/register', require('./auth'))

module.exports = router