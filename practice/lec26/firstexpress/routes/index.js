var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/product", function (req, res, next) {
  res.render("index", {title: "products"});
});


module.exports = router;
