const productMovementService = require('../services/productMovementService');
const saleDetailsServices = require('../services/saleDetailsService');
const billsToReceiveServices = require('../services/billsToReceiveServices');
const movementBillsToReiceveServices = require('../services/movementBillsToReceiveServices');
const { verifyToken } = require('../auth/authServices');
const salesService = require('../services/salesService');
const salesController = require('../controllers/salesController');

const db = require('../models');
var express = require('express');
var router = express.Router();
const MovementBillsToReiceveServices = new movementBillsToReiceveServices(db.movementBillsToReiceve);
const BillsToReceiveServices = new billsToReceiveServices(db.BillsToReceive, MovementBillsToReiceveServices);
const SaleDetailsServices =  new saleDetailsServices(db.SaleDetails, BillsToReceiveServices);
const ProductMovementModel = new productMovementService(db.ProductMovement, db.Product, db.Deposit);
const SalesService = new salesService(db.Sales, SaleDetailsServices, db.Client, ProductMovementModel, db.Deposit, db.Product);
const SalesController = new salesController(SalesService);

router.post('/newSale', verifyToken, function(req, res) {
    SalesController.create(req, res);
});

router.get('/findByNF', verifyToken, (req, res) => {
    SalesController.findByNF(req, res);
});

router.get('/findAll', verifyToken, (req, res) => {
    SalesController.findAll(req, res);
})


module.exports = router;