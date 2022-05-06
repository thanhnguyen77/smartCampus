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
    }
},{
    collection:'data'
});

module.exports = mongoose.model('data', PostSchema_test)