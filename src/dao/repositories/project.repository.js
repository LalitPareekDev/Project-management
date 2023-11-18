const projectModel = require('../schemas/project.schema');
require('../../services/mongodb.connection');

const addProject = async (data) => {
    try {
        let { projet_id, projet_name, created_by, updated_by } = data;
        const insertdata = new projectModel({
            projet_id: projet_id,
            projet_name: projet_name,
            created_by: created_by,
            updated_by: updated_by
        })

        const response = await insertdata.save();
        console.log('response=== ', response);
        return {
            status: 'Success',
            statusCode: 201,
            message: 'Project Created Successfully..!!',
            data: response
        }
    } catch (error) {
        console.log(error);
        return {
            status: 'Failed',
            statusCode: 404,
            message: 'Project Not Created Something Wents Wrong..!!',
            error: error
        }
    }
}

const getProjectById = async (id) => {
    try {
        let getProject = await projectModel.find({ projet_id: id });
        if (getProject.length <= 0) {
            return {
                status: 'Error',
                statusCode: 404,
                message: 'Project not found..!!',
                data: getProject
            }
        }
        return {
            status: 'Success',
            statusCode: 200,
            message: 'Project fetch Successfully..!!',
            data: getProject
        }
    } catch (error) {
        console.log(error);
        return {
            status: 'Failed',
            statusCode: 404,
            message: 'Project Not Found Something Wents Wrong..!!',
            error: error
        }
    }

}

const updateProject = async (id, projectData) => {
    const findQuery = { projet_id: id };
    const updateQuery = {
        projet_name: projectData.projet_name,
        project_status: projectData.project_status,
        updated_by: projectData.updated_by,
        updated_at: Date.now,

    }
    const queryOption = {
        multi: true,
        upsert: false
    }

    try {
        const response = await projectModel.updateMany(findQuery, updateQuery, queryOption)
        return {
            status: 'Ok',
            statusCode: 201,
            massege: 'Project Data Updated sucessfully....!!',
            data: result
        }
    } catch (error) {
        return {
            status: 'error',
            statusCode: 405,
            error: error
        }
    }
}

const deleteProject = async (id) => {
    const findQuery = {
        projet_id: id
    }

    const queryOption = {
        multi: true
    }

    try {
        const result = await projectModel.deleteMany(findQuery, queryOption)
        return {
            status: 'Ok',
            statusCode: 200,
            massege: 'Project Data deleted successfully....!!',
            data: result
        }
    } catch (error) {
        return {
            status: 'error',
            statusCode: 405,
            error: error
        }
    }
}

const getAllProjects = async () => {
    const findQuery = {}

    try {
        const result = await projectModel.find(findQuery)
        if (result == null) {
            return {
                status: 'error',
                statusCode: 405,
                error: 'Opps.. Project not found...!!'
            }
        } else {
            return {
                status: 'Ok',
                statusCode: 200,
                massege: 'Project data fatched...!!',
                data: result
            }
        }

    } catch (error) {
        return {
            status: 'error',
            statusCode: 405,
            error: error
        }
    }
}

module.exports = { addProject, getProjectById, updateProject, deleteProject, getAllProjects }