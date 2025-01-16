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
    role: {
        type: String,
        default: 'user'
    },
    others: {
        coins: { type: String, default: "100" },
        water: { type: String, default: "100" },
        meCourse: [
            {
                meCourseId: { type: String },
                meCourseAt: { type: Date, default: Date.now }
            }
        ],
        meBlog: [
            {
                meBlogId: { type: String },
                meBlogAt: { type: Date, default: Date.now }
            }
        ],
        likeBlog: [
            {
                likeBlogId: { type: String },
                likeBlogAt: { type: Date, default: Date.now }
            }
        ],
        items: [
            {
                itemName: { type: String },
                dem: { type: String }
            }
        ],
        huyhieu: [
            {
                image: { type: String }
            }
        ]
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