const express = require("express")
const router_post = express.Router()
const path = require('path')
const post_data_test = require("../api-models/post-data-test")
const post_data = require("../api-models/post-data")
const post_data_kq = require("../api-models/post-kq-train")
const cors = require('cors');


router_post.use(express.json());
router_post.use(cors());
// Import API POST
    router_post.post('/test', (req, res) => {
        const post_test = new post_data_test({
            text1: req.body.text1,
            text2: req.body.text2,
        });
      
        post_test.save()
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.json({message: err});
            });
    });
    router_post.get('/get-data-test', async (req, res) => {

        try {
            const get_data_test = await post_data_test.find();
            res.send(get_data_test)

        } catch (err) {
            res.json({message: err}) 
        }
    });



    // 

    router_post.post('/post-data', (req, res) => {
        const Post_data = new post_data({
            PM25: ((req.body.PM25)/7).toFixed(0),
            PM10: ((req.body.PM10)/7).toFixed(0),
            // PM25: req.body.PM25,
            // PM10: req.body.PM10,
            NO2: req.body.NO2,
            CO: req.body.CO,
            SO2: req.body.SO2,
            // SO2: ((req.body.SO2)/10).toFixed(0),
            O3: req.body.O3
        });
      
        Post_data.save()
            .then(data => {
                res.json(data);
                // console.log(data);
            })
            .catch(err => {
                res.json({message: err});
            });
    });
    router_post.get('/get-data', async (req, res) => {
        res.setHeader('Access-Control-Allow-Origin','http://localhost:3000');
        res.setHeader('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT, PATCH, DETELE');
        res.setHeader('Access-Control-Allow-Headers','X-Requested-With, content-type');
        res.setHeader('Access-Control-Allow-Credentials',true);
        try {
            const get_data = await post_data.find().sort({_id:-1}).limit(1);;
            res.send(get_data)

        } catch (err) {
            res.json({message: err}) 
        }
    });

    router_post.post('/post-data-result', (req, res) => {
        res.setHeader('Access-Control-Allow-Origin','http://localhost:3000');
        res.setHeader('Access-Control-Allow-Methods','GET,POST, OPTIONS, PUT, PATCH, DETELE');
        res.setHeader('Access-Control-Allow-Headers','X-Requested-With, content-type');
        res.setHeader('Access-Control-Allow-Credentials',true);
        const Post_data_kq = new post_data_kq({
            PM25: req.body.PM25,
            PM10: req.body.PM10,
            NO2: req.body.NO2,
            CO: req.body.CO,
            SO2: req.body.SO2,
            O3: req.body.O3,
            kq1: req.body.kq1,
            kq2: req.body.kq2,
            kq3: req.body.kq3,
            kq4: req.body.kq4,
            kq5: req.body.kq5,
            kq6: req.body.kq6
        });
      
        Post_data_kq.save()
            .then(data => {
                res.json(data);
                // console.log("-----------------");
                // console.log(data);
            })
            .catch(err => {
                res.json({message: err});
            });
            
    });
    router_post.get('/get-data-result', async (req, res) => {
        res.setHeader('Access-Control-Allow-Origin','http://localhost:8000');
        res.setHeader('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT, PATCH, DETELE');
        res.setHeader('Access-Control-Allow-Headers','X-Requested-With, content-type');
        res.setHeader('Access-Control-Allow-Credentials',true);
        try {
            const get_data_kq = await post_data_kq.find().sort({_id:-1}).limit(1);
            res.send(get_data_kq)

        } catch (err) {
            res.json({message: err}) 
        }
    });
    router_post.delete('/detele/attendance', async (req, res) => {
        try {
            const Post_data = await post_data.remove();
            res.json(Post_data)
        } catch (err) {
            res.json({message: err})
            
        }
    });
    router_post.delete('/detele', async (req, res) => {
        try {
            const Post_data_kq = await post_data_kq.remove();
            res.json(Post_data_kq)
        } catch (err) {
            res.json({message: err})
            
        }
    });
module.exports = router_post;