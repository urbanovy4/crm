const express = require('express');
const passport = require('passport');
const router = express.Router();
const controller = require('./../controllers/category')


router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.patch('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
