const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Username and password are required');
    }

    userModel.registerUser(username, password, (err, userId) => {
        if (err) {
            if (err.code === 'SQLITE_CONSTRAINT') {
                return res.status(400).send('Username already exists');
            }
            return res.status(500).send('Failed to register user');
        }

        res.status(200).send(`User registered with ID ${userId}`);
    });
};

const login = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Username and password are required');
    }

    userModel.findUserByUsername(username, async (err, user) => {
        if (err || !user) {
            return res.status(400).send('Invalid username or password');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(400).send('Invalid username or password');
        }

        const token = jwt.sign({ id: user.id, username: user.username }, 'your_jwt_secret', {
            expiresIn: '1h'
        });

        res.status(200).json({ 
            token
         });
    });
};
const getAllUsers = (req, res) => {
    userModel.getAllUsers((err, users) => {
        if (err) {
            return res.status(500).send('Failed to retrieve users from the database');
        }

        res.status(200).json({
            data: users
        });
    });
};

module.exports = {
    register,
    login,
    getAllUsers
};
