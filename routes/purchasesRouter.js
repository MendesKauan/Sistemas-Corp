// routes/purchases.js

const purchasesService = require('../services/purchasesService');
const purchasesController = require('../controllers/purchasesController');

const db = require('../models');
const { verifyToken } = require('../auth/authServices');

const PurchasesService = new purchasesService(db.Purchases);
const PurchasesController = new purchasesController(PurchasesService);

const express = require('express');
const router = express.Router();

router.get('/findOne', verifyToken, function(req, res) {
    PurchasesController.findOne(req, res);
});

router.get('/findAll', verifyToken, function(req, res) {
    PurchasesController.findAll(req, res);
});

module.exports = router;