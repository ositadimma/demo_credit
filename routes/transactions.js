const express = require("express");
const router = express.Router();
//const knex = require('../config/knex')
const transactionsCtrl= require('../controllers/transactions');



//Register Handle


router.post('/deposit', transactionsCtrl.deposit);

router.post('/transfer', transactionsCtrl.transfer);

router.post('/withdraw', transactionsCtrl.withdraw);




module.exports = router;
