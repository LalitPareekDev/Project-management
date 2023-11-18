const express = require('express');
const projectRepository = require('../dao/repositories/project.repository');
const userRepository = require('../dao/repositories/user.repository');
const { verifyUser } = require('../util/auth-verify');

const projectRouter = express.Router();

projectRouter.post('/add-project', verifyUser, async(req, res, next) => {
    let user = req.userPayload;
    let { projet_id, projet_name } = req.body;

    if (!projet_id) {
        res.status(404).json({
            statusCode: 404,
            status: 'Error',
            error: 'Project Id is missing..!!'
        })
        return;
    }
    if (!projet_name) {
        res.status(404).json({
            statusCode: 404,
            status: 'Error',
            error: 'Project NAme is missing..!!'
        })
        return;
    }

    let userResponse = await userRepository.getUserByEmail(user.email)
    if (userResponse.status == 'Error') {
        res.status(userResponse.statusCode).json({
            statusCode: 404,
            status: 'Error',
            error: 'User not found..!!'
        })
        return;
    }

    let projectMap = {
        projet_id: projet_id,
        projet_name: projet_name,
        created_by: user.email,
        updated_by: user.email
    }

    let addProject = await projectRepository.addProject(projectMap)
    if (addProject.status == 'Success') {
        res.status(addProject.statusCode).json(addProject);
        return;
    }
})

module.exports = projectRouter;