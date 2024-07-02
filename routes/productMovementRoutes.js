const productMovementService = require('../services/productMovementService');
const productMovementController = require('../controllers/productMovementController');
const db = require('../models');

const { verifyToken } = require('../auth/authServices');

var express = require('express');
var router = express.Router();

const ProductMovementService = new productMovementService(db.ProductMovement, db.Product, db.Deposit);
const ProductMovementController = new productMovementController(ProductMovementService);

router.post('/inputProductMovement', verifyToken, function(req, res) {
    ProductMovementController.createInput(req, res);
});

router.post('/outputProductMovement', verifyToken, function(req, res) {
    ProductMovementController.createOutput(req, res);
});

router.get('/findAllByProduct', verifyToken, function(req,res){
    ProductMovementController.findAllByProduct(req, res);
});

router.get('/findAllByDeposit', verifyToken, function(req,res){
    ProductMovementController.findAllByDeposit(req, res);
});

router.get('/findAllByDateRange',  verifyToken, function(req,res){
    ProductMovementController.findAllByDateRange(req, res);
});

module.exports = router;