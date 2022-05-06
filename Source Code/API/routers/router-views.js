const express = require("express");
const router = express();
const bodyParser = require('body-parser');
const cors = require('cors')

router.use(bodyParser());
router.use(express.static("public"));
router.set("view engine","ejs");
router.set("views", "./views");


router.get("/",function(req, res){
    res.render("index", {
    }) ;
});
router.use(cors());
router.get("/map",function(req, res){
    res.render("maps", {
    }) ;
});


module.exports = router;
