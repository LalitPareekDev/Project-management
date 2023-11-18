const express = require('express');
const userRepository = require('../dao/repositories/user.repository');
const jwt = require('../util/jwt');

const userRouter = express.Router();

userRouter.post('/register', async(req, res, next) => {
    
        let {email, password, created_by, updated_by} = req.body;
        if (!email) {
            res.status(406).json({
                status: 'Error',
                statuscode: 406,
                error: 'Email is Missing..!!'
            })
            return;
        }
        if (!password) {
            res.status(406).json({
                status: 'Error',
                statuscode: 406,
                error: 'Email is Missing..!!'
            })
            return;
        }
        if (!created_by && !updated_by) {
            res.status(406).json({
                status: 'Error',
                statuscode: 406,
                error: 'created_by Or updated_by Missing..!!'
            })
            return;
        }
        let createMap = {
            email: email,
            password: password,
            created_by: created_by,
            updated_by: updated_by
        }
        let checkUser = await userRepository.getUserByEmail(email);
        if (checkUser.statusCode == 200) {
            res.status(403).json({
                status: 'Error',
                statusCode: 403,
                error: 'User already Registered..!!'
            })
            return;
        }

        let createUserResponse = await userRepository.addUser(createMap);
        if (createUserResponse.status == 'Success') {
            res.status(createUserResponse.statusCode).json(createUserResponse);
            return;
        }
    
})

userRouter.post('/login', async(req, res, next) => {
   
    if(!req.body) {
        res.status(404).json({
            status: 'Error',
            message: 'Credentials missing...!'
        })
        return;
    }
    let checkUser = await userRepository.getUserByEmail(req.body.email);
    if (checkUser.status == 'Error') {
        res.status(checkUser.statusCode).json({
            status: 'Error',
            statusCode: 404,
            error: 'User not found please Register now..!!'
        })
        return;
    }
    let getUserResponse = await userRepository.getUser(req.body);
    console.log(getUserResponse)
    if(getUserResponse.statusCode == 200){
        let payload = {
            email: getUserResponse.user[0].email
        }
        let token = jwt.generateToken(payload)
        res.status(200).json({
            status: 'Success',
            statusCode: 200,
            token: token,
            user: {
                email: getUserResponse.user[0].email,
            }
        })
        return;
    }

})

module.exports = userRouter;