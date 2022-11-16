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
          host : process.env.DB_CLIENT,
          port : process.env.DB_PORT,
          user : process.env.DB_USERNAME,
          password : process.env.DB_PASSWORD,
          database : process.env.DB_DATABASE
        }
    },
}

