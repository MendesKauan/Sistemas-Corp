const db = require('../models');
var express = require('express');
var router = express.Router();

const { verifyToken } = require('../auth/authServices');

const supplierService = require('../services/supplierService');
const supplierController = require('../controllers/supplierController');

const SupplierService = new supplierService(db.Supplier);
const SupplierController = new supplierController(SupplierService);

router.post('/newSupplier', verifyToken, function(req, res) {
    SupplierController.create(req, res);
});

router.get('/findAll', verifyToken, function(req, res) {
    SupplierController.findAll(req, res);
});

router.get('/findOne', verifyToken, function(req, res) {
    SupplierController.findOne(req, res);
});

router.get('/findAllByCompany', verifyToken, function(req, res) {
    SupplierController.findAllByCompany(req, res);
});

router.post('/update', verifyToken, function(req, res) {
    SupplierController.update(req, res);
});

module.exports = router;