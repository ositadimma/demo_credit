const express = require("express");
const router = express.Router();
const knex = require('../config/knex')
const bcrypt = require('bcryptjs');

const register= async (req, res) => {
    let { firstname, lastname, email,  password, middlename, username, country} = req.body;
    

    let errors = [];

    if( !lastname){
        lastname= null
    }

    //check required fields
    if( !firstname){
        firstname= null
    }

    if( !middlename){
        middlename= null
    }

    if( !country){
        country= null
    }

    if( !username){
        errors.push({ msg: '*Select a username to continue', type: 'usernameErr' })
    }

    if( !email){
        errors.push({ msg: '*email  is required', type: 'emailErr' })
    }

    if(email){
        if(email.length < 5 || email.indexOf('') > 0){
            errors.push({ msg: '*email not correct', type: 'emailErr' })
        }
    }
    if( !password){
        errors.push({ msg: '*please enter password', type: 'passwordErr' })
    }

    //Check Password
    if(password){
        if(password.length < 6) {
            errors.push({ msg: '*password should be at least 6 characters', type: 'passwordErr' })
        }
    }
    knex('users')
    .where({email_address: email})
    .first()
    .then(user=>{
        if(user) {
            errors.push({ msg: 'Email is already registered', type: 'failedErr' })
        }
    })
    .catch(err =>{
         console.log(err)
    })
    
    if(errors.length > 0) {
        console.log(errors)
        res.status(400).send( errors)
    }else {
    
        //Validation passed
        const saltRounds = 10;
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                knex('users').insert(
                    {
                        first_name: firstname,
                        middle_name: middlename,
                        last_name: lastname,
                        password: hash,
                        email_address: email,
                        username: username,
                        country: country
                    }
                )
                .then(()=>{
                    knex('users')
                    .where({email_address: email})
                    .first()
                    .then(user=>{
                        knex('accounts').insert(
                            {
                                user_id: user.id,
                                balance: 0
                            }
                        ).then(()=>{
                            console.log('user registered')
                            const token= 'xxxxxx'
                            res.setHeader('Authorization', 'Bearer'+token+'_'+user.id)
                            knex('accounts')
                            .where({user_id: user.id})
                            .first()
                            .then(account=>{
                                res.status(201).json(
                                    {
                                        id: user.id,
                                        username: user.username,
                                        balance: account.balance
                                    }
                                );

                            })
                            
                        })
                    })
                    
                })
                .catch(err=>{
                    res.status(102).send({error: 'processing'})
                })
            });
        });
    }
}
const login= (req, res, next) => {
    let email= req.body.email
    let password= req.body.password

    knex('users')
    .where({email_address: email})
    .first()
    .then(user=>{
        if(!user){
            res.status(401).json({
                err: "No user by that name"
            })
        } else {
            return bcrypt
                   .compare(password, user.password)
                   .then(isAuthenticated=>{
                    if(!isAuthenticated){
                        res.status(401).json({
                            error: 'Unauthorized Access!'
                        })
                    } else {
                        knex('accounts')
                        .where({user_id: user.id})
                        .first()
                        .then(account=>{
                            console.log(account)
                            const token= 'xxxxxx'
                            res.setHeader('Authorization', 'Bearer'+token+'_'+user.id)
                            res.status(200).json({
                                id: user.id,
                                username: user.username,
                                balance: account.balance
                            })
                        })
                        .then(
                            console.log('logged in')
                        )

                    }
                })
        }
    }

    )

 }

 module.exports = {
    register,
    login
 };