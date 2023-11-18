const boardModel = require('../schemas/board.schema');
require('../../services/mongodb.connection');

const addBoard = async (data) => {
    try {
        let { board_id, projet_id, board_name, created_by, updated_by } = data;
        const insertdata = new boardModel({
            board_id: board_id,
            projet_id: projet_id,
            board_name: board_name,
            created_by: created_by,
            updated_by: updated_by
        })

        const response = await insertdata.save();
        return {
            status: 'Success',
            statusCode: 201,
            message: 'Board Created Successfully..!!',
            data: response
        }
    } catch (error) {
        console.log(error);
        return {
            status: 'Failed',
            statusCode: 404,
            message: 'Board Not Created Something Wents Wrong..!!',
            error: error
        }
    }
}

const getBoardById = async (id) => {
    try {
        let getBoard = await boardModel.find({ projet_id: id });
        if (getBoard.length <= 0) {
            return {
                status: 'Error',
                statusCode: 404,
                message: 'Board not found..!!',
                data: getBoard
            }
        }
        return {
            status: 'Success',
            statusCode: 200,
            message: 'Board fetch Successfully..!!',
            data: getBoard
        }
    } catch (error) {
        console.log(error);
        return {
            status: 'Failed',
            statusCode: 404,
            message: 'Board Not Found Something Wents Wrong..!!',
            error: error
        }
    }

}

const updateBoard = async (id, boardData) => {
    const findQuery = { board_id: id };
    const updateQuery = {
        board_name: boardData.board_name,
        board_status: boardData.board_status,
        updated_by: boardData.updated_by,
        updated_at: Date.now,

    }
    const queryOption = {
        multi: true,
        upsert: false
    }

    try {
        const response = await boardModel.updateMany(findQuery, updateQuery, queryOption)
        return {
            status: 'Ok',
            statusCode: 201,
            massege: 'Board Data Updated sucessfully....!!',
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

const deleteBoard = async (id) => {
    const findQuery = {
        board_id: id
    }

    const queryOption = {
        multi: true
    }

    try {
        const result = await boardModel.deleteMany(findQuery, queryOption)
        return {
            status: 'Ok',
            statusCode: 200,
            massege: 'Board Data deleted successfully....!!',
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

const getAllBoards = async () => {
    const findQuery = {}

    try {
        const result = await boardModel.find(findQuery)
        if (result == null) {
            return {
                status: 'error',
                statusCode: 405,
                error: 'Opps.. Board not found...!!'
            }
        } else {
            return {
                status: 'Ok',
                statusCode: 200,
                massege: 'Board data fatched...!!',
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

module.exports = { addBoard, getBoardById, updateBoard, deleteBoard, getAllBoards }