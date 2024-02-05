const express = require('express')
const router = express.Router()

router.get('/health', (req, res, next) => {
    res.send("healthy route!")
})

router.use(express.json())
router.use('/auth', require('./auth'))


module.exports = router