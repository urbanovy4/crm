const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const keys = require('../config/keys');
const User = require('../models/User');

async function checkIfUserExist(req) {
    const candidate = User.findOne({
        email: req.body.email
    });

    return candidate;
}

module.exports.login = async function (req, res) {
    const candidate = await checkIfUserExist(req);

    if (candidate) {
        // Checking password
        const passwordResult = await bcrypt.compare(req.body.password, candidate.password);
        if (passwordResult) {
            //Need to generate token
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, {expiresIn: 60 * 60});

            res.status(200).json({
                token: `Bearer ${token}`
            });
        } else {
            //If passwords don't match
            res.status(401).json({
                message: 'Passwords don\'t match'
            })
        }
    } else {
        //User does not exist
        res.status(404).json({
            message: 'User with this email not found'
        })
    }
}

module.exports.register = async function (req, res) {
   const candidate = await checkIfUserExist(req);

    if (candidate) {
        //Creating user forbidden
        res.status(409).json({
           message: 'User with this email already exist. Try writing another.'
        });
    } else {
        const salt = await bcrypt.genSalt(10);
        const password = req.body.password;
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        });

        try {
            await user.save();
            res.status(201).json({
                message: `User successfully created. ${user}`
            });
        } catch (e) {
            console.error(e.message);
        }
    }
}
