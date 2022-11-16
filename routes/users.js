const express = require("express");
const router = express.Router();
const userCtrl= require('../controllers/users');
// const knex = require('../config/knex')
// const bcrypt = require('bcryptjs');



//Handle User Registeration
router.post('/register', userCtrl.register);

//Handle User Login
router.post('/login', userCtrl.login);

 module.exports = router;