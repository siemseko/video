const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.sendStatus(401); // Unauthorized
    }

    jwt.verify(token.split(' ')[1], 'your_jwt_secret', (err, user) => {
        if (err) {
            return res.sendStatus(403); // Forbidden
        }

        req.user = user; // Attach user to the request object
        next(); // Pass control to the next handler
    });
};

module.exports = authenticateJWT;
