const billsToReceiveServices = require('../services/billsToReceiveServices');
const billsToReceiveController = require('../controllers/billsToReceiveController');
const movementBillsToReceiveServices = require('../services/movementBillsToReceiveServices');

const db = require('../models');
const { verifyToken } = require('../auth/authServices');

var express = require('express');
var router = express.Router();

const MovementBillsToReceiveServices = new movementBillsToReceiveServices(db.movementBillsToReceive);
const BillsToReceiveServices = new billsToReceiveServices(db.BillsToReceive, MovementBillsToReceiveServices, db.Client);
const BillsToReceiveController = new billsToReceiveController(BillsToReceiveServices);

router.get('/', function(req, res, next) {
    res.send('Módulo de contas a receber está rodando');
});

router.post('/receiveBill', verifyToken, function(req, res) {
    BillsToReceiveController.receiveBill(req, res);
});

router.post('/cancelBill', verifyToken, function(req, res) {
    BillsToReceiveController.cancelBill(req, res);
});

router.get('/findOne', verifyToken, function(req, res) {
    BillsToReceiveController.findOne(req, res);
});

router.get('/findAll', verifyToken, function(req, res) {
    BillsToReceiveController.findAll(req, res);
});

module.exports = router;
