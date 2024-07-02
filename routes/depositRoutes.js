const depositService = require('../services/depositService');
const depositController = require('../controllers/depositController');
const db = require('../models');
const { verifyToken } = require('../auth/authServices');

var express = require('express');
var router = express.Router();

const DepositService = new depositService(db.Deposit);
const DepositController = new depositController(DepositService);

router.post('/newDeposit', verifyToken, function(req, res) {
    DepositController.create(req, res);
});

router.post('/update', verifyToken, function(req, res) {
    DepositController.update(req, res);
});

router.get('/getAllDeposit', verifyToken, function(req, res) {
    DepositController.getAllDeposit(req, res);
})

router.get('/depositByName', verifyToken, function(req, res) {
    DepositController.getDepositByName(req, res);
});


module.exports = router;
 