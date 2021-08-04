module.exports.login = function (req, res) {
    res.status(200).json({
        'Login': {
            email: req.body.email,
            password: req.body.password
        }
    });
}

module.exports.register = function (req, res) {
    res.status(201).json({
        'Created': true
    });
}
