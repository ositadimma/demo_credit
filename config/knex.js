var environment= process.env.NODE_ENV || 'development';
var config= require('../knexfile.js');
module.exports= require('knex')(config.development)