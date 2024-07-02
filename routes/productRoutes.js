const productService = require('../services/productService');
const productController = require('../controllers/productController');
const db = require('../models');
const { verifyToken } = require('../auth/authServices');

var express = require('express');
var router = express.Router();

const ProductService = new productService(db.Product);
const ProductController = new productController(ProductService);

router.post('/newProduct', verifyToken, function(req, res) {
    ProductController.create(req, res);
});

router.post('/update', verifyToken, function(req, res) {
    ProductController.update(req, res);
});

router.get('/getAllProduct', verifyToken, function(req, res) {
    ProductController.getAllProduct(req, res);
})

router.get('/getProductByName', verifyToken, function(req, res) {
    ProductController.getProductByName(req, res);
});


module.exports = router;
 