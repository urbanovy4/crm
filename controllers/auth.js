const bcrypt = require('bcryptjs');
const User = require('../models/User');

module.exports.login = async function (req, res) {
    res.status(200).json({
        'Login': {
            email: req.body.email,
            password: req.body.password
        }
    });
}

module.exports.register = async function (req, res) {
   const candidate = await User.findOne({
       email: req.body.email
   });

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
            //...
        }
    }
}
