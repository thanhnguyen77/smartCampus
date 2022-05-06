const mongoose = require('mongoose')

const PostSchema_test = mongoose.Schema({
    PM25: {
        type: String,
        require: true
    },
    PM10: {
        type: String,
        require: true
    },
    NO2: {
        type: String,
        require: true
    },
    CO: {
        type: String,
        require: true
    },
    SO2: {
        type: String,
        require: true
    },
    O3: {
        type: String,
        require: true
    },
    kq1: {
        type: String,
        require: true
    },
    kq2: {
        type: String,
        require: true
    },
    kq3: {
        type: String,
        require: true
    },
    kq4: {
        type: String,
        require: true
    },
    kq5: {
        type: String,
        require: true
    },
    kq6: {
        type: String,
        require: true
    }
},{
    collection:'data-kq'
});

module.exports = mongoose.model('data-kq', PostSchema_test)