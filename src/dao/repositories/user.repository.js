const userModel = require('../schemas/user.schema');
const bcrypt = require('../../util/bcrypt');
require('../../services/mongodb.connection');

const addUser = async (data) => {
    try{
        let { email, password, created_by, updated_by} = data;
        let hashPassword = await bcrypt.encrypt(password);

        const insertdata = new userModel({
            email: email,
            password: hashPassword,
            created_by: created_by,
            updated_by: updated_by 
        })

        const response = await insertdata.save();
        console.log('response=== ',response);
        return {
            status: 'Success',
            statusCode: 201,
            message: 'User Created Successfully..!!',
            data: response
        }
    }catch(error){
        console.log(error);
        return {
            status: 'Failed',
            statusCode: 404,
            message: 'User Not Created Something Wents Wrong..!!',
            error: error
        }
    }
}

const getUserByEmail = async(data) => {
    try{
        let getUser = await userModel.find({email: data});
        if(getUser.length <= 0){
            return {
                status: 'Error',
                statusCode: 404,
                message: 'User not found..!!',
                data: response
            }
        }
        return {
            status: 'Success',
            statusCode: 200,
            message: 'User fetch Successfully..!!',
            data: getUser
        }
    }catch(error){
        console.log(error);
        return {
            status: 'Failed',
            statusCode: 404,
            message: 'User Not Found Something Wents Wrong..!!',
            error: error
        }
    }
    
}

const getUser = async(data) => {
    try{
        let { email, password} = data;
        console.log( email, password)
        let getUser = await userModel.find({email: email});
        if(getUser.length <= 0){
            return {
                status: 'Error',
                statusCode: 404,
                message: 'User not found..!!',
                data: getUser
            }
        } else if(!bcrypt.verify(getUser[0].password, password)) {
            return {
                status: 'Error',
                statusCode: 404,
                message: 'Authentication failed...!!!'
            };
        }
        return {
            status: 'Success',
            statusCode: 200,
            message: 'User fetch Successfully..!!',
            user: getUser
        }
    }catch(error){
        console.log(error);
        return {
            status: 'Failed',
            statusCode: 404,
            message: 'Authentication failed Something Wents Wrong..!!',
            error: error
        }
    }
    
}

module.exports = { addUser, getUserByEmail, getUser };
