const clientService = require('../services/clientService');
const clientController = require('../controllers/clientController');

const db = require('../models');
var express = require('express');
var router = express.Router();

const { verifyToken } = require('../auth/authServices')
const ClientService = new clientService(db.Client);
const ClientController = new clientController(ClientService);

router.post('/newClient', verifyToken, function(req, res) {
    ClientController.create(req, res);
});

router.get('/findOneByNameOrCPF', verifyToken, function(req, res) {
    ClientController.findOneByNameOrCPF(req, res);
});

router.get('/findAll', verifyToken, function(req, res) {
    ClientController.findAll(req, res);
});

module.exports = router;