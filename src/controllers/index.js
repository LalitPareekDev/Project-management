const express = require('express');
const userController = require('./user.controller');
const projectController = require('./project.controller')

const mainRouter = express.Router();

mainRouter.use('/user', userController );
mainRouter.use('/project', projectController );

module.exports = mainRouter;