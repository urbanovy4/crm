const express = require('express');
const router = express.Router();
const controller = require('./../controllers/analytics')

router.get('/', controller.overview);
router.get('/', controller.analytics);

module.exports = router;
