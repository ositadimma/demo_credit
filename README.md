# wallet service

Demo wallet service repo contains a MVP (Minimum viable product) wallet service created with NodeJS. It allows you store funds, make transactions and store payment histories

## design
This project was developed with NodeJs, MySQL and Knex ORM. It make use 

## instructions
* Fork this repository
* run npm start/yarn start at root directory of repository

## end points
* post '/users/register': sign up for wallet
* post '/users/login': log in to wallet
* post '/transactions/deposit': deposit funds
* post '/transactions/withdraw': withdraw funds
* post '/transactions/transfer': transfer funds
* get '/transactions/transfer': view account details

## test
[test](app.test.js)

