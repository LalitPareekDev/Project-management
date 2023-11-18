const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    email :{
        type: String,
        required: true
    },
    password: {
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

module.exports = new mongoose.model('usersSchema', schema);