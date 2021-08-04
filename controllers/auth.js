module.exports.login = function (req, res) {
    res.status(200).json({
        'Login': true
    });
}

module.exports.register = function (req, res) {
    res.status(201).json({
        'Created': true
    });
}
