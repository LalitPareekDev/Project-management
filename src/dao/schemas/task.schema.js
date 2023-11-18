const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    task_id :{
        type: Number,
        required: true
    },
    board_id :{
        type: Number,
        required: true
    },
    task_name :{
        type: String,
        required: true
    },
    task_desc :{
        type: String,
        required: true
    },
    task_status: {
        type: String,
        enum : ['todo','in-progress', 'completed'],
        default: 'todo'
    },
    assign_by: {
        type: String,
        required: true
    },
    assign_to: {
        type: String,
        required: true
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

module.exports = new mongoose.model('taskSchema', schema);