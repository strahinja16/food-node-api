const { Router } = require('express');
const authRouter = require('./auth');
const usersRouter = require('./users');
const recipesRouter = require('./recipes');

const router = Router();

router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/recipes', recipesRouter);

module.exports = router;
