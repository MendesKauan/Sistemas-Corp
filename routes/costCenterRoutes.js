const costCenterService =  require('../services/costCenterService');
const costCenterController = require('../controllers/costCenterController');

const db = require('../models');
const { verifyToken } = require('../auth/authServices');

const CostCenterService = new costCenterService(db.CostCenter, db.Department);
const CostCenterController = new costCenterController(CostCenterService);

var express = require('express');
var router = express.Router()

router.post('/create', verifyToken ,function(req, res) {
    CostCenterController.create(req, res);
});

router.get('/findAll', verifyToken ,function(req, res) {
    CostCenterController.findAll(req, res);
});

router.get('/findByCode', verifyToken ,function(req, res) {
    CostCenterController.findByCode(req, res);
});


module.exports = router;