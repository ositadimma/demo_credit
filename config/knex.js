var environment= process.env.NODE_ENV ;
var config= require('../knexfile.js');
module.exports= require('knex')(config.production)