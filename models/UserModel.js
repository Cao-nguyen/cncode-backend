const mongoose = require('mongoose');
const generate = require('../helpers/randomToken');

const Schema = mongoose.Schema;

const Users = new Schema({
    fullName: { type: String },
    email: { type: String },
    username: { type: String },
    password: { type: String },
    tokenUser: {
        type: String,
        default: generate.generateRandomString(50)
    },
    status: {
        type: String,
        default: 'active'
    },
    deleted: { type: String, default: false }
},
    {
        timestamp: true
    })

module.exports = mongoose.model('users', Users);