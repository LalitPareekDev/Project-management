const taskModel = require('../schemas/task.schema');
require('../../services/mongodb.connection');

const addTask = async (data) => {
    try {
        let { task_id, board_id, task_name, task_desc, assign_by, assign_to, created_by, updated_by } = data;
        const insertdata = new taskModel({
            task_id: task_id,
            board_id: board_id,
            task_name: task_name,
            task_desc: task_desc,
            assign_by: assign_by,
            assign_to: assign_to,
            created_by: created_by,
            updated_by: updated_by
        })

        const response = await insertdata.save();
        return {
            status: 'Success',
            statusCode: 201,
            message: 'Task Created Successfully..!!',
            data: response
        }
    } catch (error) {
        console.log(error);
        return {
            status: 'Failed',
            statusCode: 404,
            message: 'Task Not Created Something Wents Wrong..!!',
            error: error
        }
    }
}

const getTaskById = async (id) => {
    try {
        let response = await taskModel.find({ task_id: id });
        if (response.length <= 0) {
            return {
                status: 'Error',
                statusCode: 404,
                message: 'Task not found..!!',
                data: response
            }
        }
        return {
            status: 'Success',
            statusCode: 200,
            message: 'Task fetch Successfully..!!',
            data: response
        }
    } catch (error) {
        console.log(error);
        return {
            status: 'Failed',
            statusCode: 404,
            message: 'Task Not Found Something Wents Wrong..!!',
            error: error
        }
    }

}

const updateTask = async (id, taskData) => {
    const findQuery = { task_id: id };
    const updateQuery = {
        task_name: taskData.task_name,
        task_desc: taskData.task_desc,
        task_status: taskData.task_status,
        assign_by: taskData.assign_by,
        assign_to: taskData.assign_to,
        updated_by: taskData.updated_by,
        updated_at: Date.now,

    }
    const queryOption = {
        multi: true,
        upsert: false
    }

    try {
        const response = await taskData.updateMany(findQuery, updateQuery, queryOption)
        return {
            status: 'Ok',
            statusCode: 201,
            massege: 'Task Data Updated sucessfully....!!',
            data: response
        }
    } catch (error) {
        return {
            status: 'error',
            statusCode: 405,
            error: error
        }
    }
}

const deleteTask = async (id) => {
    const findQuery = {
        task_id: id
    }

    const queryOption = {
        multi: true
    }

    try {
        const result = await taskModel.deleteMany(findQuery, queryOption)
        return {
            status: 'Ok',
            statusCode: 200,
            massege: 'Task Data deleted successfully....!!',
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

const getAllTask = async () => {
    const findQuery = {}

    try {
        const result = await taskModel.find(findQuery)
        if (result == null) {
            return {
                status: 'error',
                statusCode: 405,
                error: 'Opps.. Task not found...!!'
            }
        } else {
            return {
                status: 'Ok',
                statusCode: 200,
                massege: 'Task data fatched...!!',
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

module.exports = { addTask, getTaskById, updateTask, deleteTask, getAllTask }