const jwt = require('jsonwebtoken');

const authRequired = (req, res, next) => {
    const token = req.get('Authorization').split(' ')[1];

    try {
        jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        res.status(401).send({
            loggedIn: false,
            message: 'Unauthorized',
        })
        throw new Error('Token invalid');
    } finally {
        next();
    }
};

module.exports = { authRequired };