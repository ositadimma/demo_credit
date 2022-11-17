module.exports= {
    development: {
        client: 'mysql',
        connection: {
          host : '127.0.0.1',
          port : 3306,
          user : 'root',
          password : '',
          database : 'demo_credit'
        }
    },
    production: {
        client: 'mysql',
        connection: {
          host : 'us-cdbr-east-06.cleardb.net',//process.env.DB_HOST,
          port : 3306,
          user : 'b41011e074cd7d',
          password : '9080853f',
          database : 'heroku_4aa3f653ca21a28'
        }
    },
}

