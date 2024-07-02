const db = require('../models');
var express = require('express');
var router = express.Router();
const { verifyToken } = require('../auth/authServices');

const proposalsService = require('../services/proposalsService');
const proposalsController = require('../controllers/proposalsController');

const ProposalsService = new proposalsService(db.Proposals, db.Supplier, db.Product, db.User);
const ProposalsController = new proposalsController(ProposalsService);

router.post('/newProposals', verifyToken, function(req, res) {
    ProposalsController.create(req, res);
});

router.get('/findByProduct', verifyToken, function (req, res) {
    ProposalsController.findOneByName(req, res);
});

router.get('/findAll', verifyToken, function (req, res) {
    ProposalsController.findAll(req, res);
});


module.exports = router;