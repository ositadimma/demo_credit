const express = require("express");
const router = express.Router();
const knex = require('../config/knex')
const viewAccount= require('../controllers/index');

router.get('/view-account', viewAccount)

module.exports = router;