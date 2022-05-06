const express = require("express")
const server = express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
require('dotenv/config')

const router_api_post = require("../routers/post-api")
const adminRouter  = require("../routers/router-views");

server.use(bodyParser.json())


server.use('/', adminRouter)
//Import router API 
    server.use('/api-smart-campus', router_api_post)

// Connection mongoose
    mongoose.connect(process.env.CONNECTION_DB,
        {useNewUrlParser: true},
        ()=> console.log('Connect to mongoose'))

// Loading server
server.listen(process.env.PORT, () => {
    console.log('Loading connection server on port: ' + process.env.PORT)
})
