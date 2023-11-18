const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    board_id :{
        type: Number,
        required: true
    },
    projet_id :{
        type: Number,
        required: true
    },
    board_name :{
        type: String,
        required: true
    },
    board_status: {
        type: String,
        enum : ['todo','in-progress', 'completed'],
        default: 'todo'
    },
    status: {
        type: String,
        enum : ['0','1'],
        default: '1'
    },
    created_by: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    },
    updated_by: {
        type: String,
        required: true
    },
    updated_at: {
        type: Date,
        required: true,
        default: Date.now
    },
})

module.exports = new mongoose.model('boardSchema', schema);