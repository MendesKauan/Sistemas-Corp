const userService = require('../services/userService'); //classe
const userController = require('../controllers/userController');
const db = require('../models');
const { verifyToken } = require('../auth/authServices');

var express = require('express');
var router = express.Router();

const UserService = new userService(db.User, db.Department); //Construção do objeto
const UserController = new userController(UserService);


router.post('/newUser', function(req, res) {
  UserController.create(req, res);
});

router.post('/login', async (req, res) => {
  UserController.login(req, res);
});

router.post('/update', verifyToken, function(req, res){
  UserController.update(req, res);
});

router.get('/getAllUser', verifyToken, function(req, res) {
  UserController.getAllUser(req, res);
});

router.get('/getUserByName', verifyToken, function(req, res) {
  UserController.getUserByName(req, res);
});

router.get('/getUsersByDepartment', verifyToken, function(req, res) {
  UserController.getUsersByDepartment(req, res);
});

module.exports = router;
