const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const db = require('./firebase');
const { secret } = require('./config');

const generateAccessToken = (id) => {
    const payload = {
        id
    }
    return jwt.sign(payload, secret, { expiresIn: '24h' });
}

class authController {
    static getCurentDate() {
        const currentDate = new Date();
        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const year = currentDate.getFullYear();
        return `${day}-${month}-${year}`;
    }

    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: 'Registration error', errors });
            }
            const { username, email, password } = req.body;
            const candidateSnapshot = await db.ref("users").orderByChild("email").equalTo(email).once("value");
            const candidate = candidateSnapshot.val();
            if (candidate) {
                return res.status(400).json({ message: 'User with such email already exists' });
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const date = authController.getCurentDate();
            const user = { username, email, password: hashPassword, date };
            await db.ref("users").push().set(user);
            const userSnapshot = await db.ref("users").orderByChild("email").equalTo(email).once("value");
            if (!userSnapshot.val()) {
                return res.status(400).json({ messege: 'Couldn\'t find a user with this email address' });
            }
            const userID = Object.values(userSnapshot.val())[0]._id;
            const token = generateAccessToken(userID);
            return res.json({ token });
        } catch (e) {
            console.log(e);
            return res.status(400).json({ message: 'Registration error' });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const userSnapshot = await db.ref("users").orderByChild("email").equalTo(email).once("value");
            if (!userSnapshot.val()) {
                return res.status(400).json({ messege: 'Couldn\'t find a user with this email address' });
            }
            const user = Object.values(userSnapshot.val())[0];
            const isPasswordCorrect = bcrypt.compareSync(password, user.password);
            if (!isPasswordCorrect) {
                return res.status(400).json({ messege: 'Incorrect user password' });
            }
            const token = generateAccessToken(user._id);
            return res.json({ token, username: user.username });
        } catch (e) {
            console.log(e);
            res.status(400).json({ messege: 'Login error' });
        }
    }
}

module.exports = new authController();