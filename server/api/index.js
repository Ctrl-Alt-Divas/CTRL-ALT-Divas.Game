const express = require("express");
const router = express.Router();

router.get("/health", (req, res, next) => {
    res.send("healthly route!");
});

router.use(express.json());
router.use("/characters", require("./characters"));
router.use('/players', require('./players'));
router.use('/auth', require('./auth'));

module.exports = router;