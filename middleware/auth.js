const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {

    // get the token from the request header
    const token = req.header('x-auth-token');

    // check for token
    if (!token) {
        return res.status(401).json({ msg: 'Not authorized' });
    }

    // check token is valid
    try {
        // decode the token
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        // get the user from the token
        res.user = decoded.user;
        next();

    } catch (err) {
        res.status(401).json({ msg: 'Invalid token' });
    }
}