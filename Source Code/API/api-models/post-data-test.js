const mongoose = require('mongoose')

const PostSchema_test = mongoose.Schema({
    text1: {
        type: String,
        require: true
    },
    text2: {
        type: String,
        require: true
    }
},{
    collection:'data-test'
});

module.exports = mongoose.model('data-test', PostSchema_test)