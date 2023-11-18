const express = require('express');
const userController = require('./user.controller');

const mainRouter = express.Router();

mainRouter.use('/user', userController );

module.exports = mainRouter;