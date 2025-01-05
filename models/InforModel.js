const mongoose = require('mongoose');

const InforSchema = new mongoose.Schema({
    infor: {
        type: String,
    },
});

const infor = mongoose.model('infor', InforSchema);

module.exports = infor;
