const knex = require('../config/knex')



const deposit= (req, res) => {

    const {amount} = req.body;
    let errors = [];
    let id= +req.headers.authorization
    if(!id){
        errors.push({ msg: '*not authorized', type: 'authErr' })
    }

    //check required fields
    if( !amount){
        errors.push({ msg: '*amount is required', type: 'lastNameErr' })
    }

    if( !id){
        errors.push({ msg: '*no authorisation', type: 'auth error' })
    }

    if(errors.length > 0) {
        res.status(404).send(errors)
    }else {
        knex('accounts')
        .where({user_id: id})
        .first()
        .select()
        .then(function(account){
            let balance= +account.balance+ +amount
            knex('accounts')
            .where({user_id: id})
            .update({balance})
            .update({updated_at: new Date()})

            knex('deposits')
            .insert({
                transaction_code: 'xxxxxx',
                account_id: account.id,
                amount: amount,
                date_time: Date.now(),
                method: 'test'
            })

            knex('transaction_log')
            .insert({
                account_id: account.id,
                amount: amount,
                type: 0
            })
        })
        .then(res.status(200).send({msg: 'account updated!'}) )               
    }   
}
const withdraw= async (req, res) => {

    const {amount} = req.body;
    const id= +req.headers.authorization
    let errors = [];

    //check required fields
    if( !amount){
        errors.push({ msg: '*amount is required', type: 'amountErr' })
    }
    
    if( !id){
        errors.push({ msg: '*no authorisation', type: 'auth error' })
    }
    console.log(id)


    if(errors.length > 0) {
        res.status(404).send(errors)
    }else {
     
        knex('accounts')
        .where({user_id: id})
        .first()
        .select()
        .then(function(account){
            let balance= +account.balance - +amount
            knex('accounts')
            .where({user_id: id})
            .update({balance})
            .update({updated_at: Date.now()})
            

            knex('withdrawals')
            .insert({
                transaction_code: 'xxxxxx',
                account_id: account.id,
                amount: amount,
                date_time: Date.now(),
                method: 'test'
            })

            knex('transaction_log')
            .insert({
                account_id: account.id,
                amount: amount,
                type: 1
            })

        })
        .catch(err=>{
            res.status(102).send({err: err})
        })

        res.status(200).json({msg: 'withdrawal complete'})
    }
    

}
const transfer= async (req, res) => {

    const { amount, account_to_id} = req.body;
    let errors = [];

    let account_from_id= +req.headers.authorization
    if(!account_from_id){
        errors.push({ msg: '*not authorized', type: 'authErr' })
    }

    //check required fields
    if( !amount){
        errors.push({ msg: '*amount is required', type: 'amountErr' })
    }


    if( !account_to_id){
        errors.push({ msg: '*select account', type: 'auth error' })
    }

    

    if(errors.length > 0) {
        res.status(404).send(errors)
    }else {
        knex('accounts')
        .where({user_id: account_from_id})
        .first()
        .select()
        .then(function(account_from){
            let balance= account_from.balance-amount
            console.log(account_from)
            knex('accounts')
            .where({id: account_from.id})
            .update({balance})
            .update({updated_at: new Date()})

            knex('transaction_log')
            .insert({
                account_id: account_from.id,
                amount: amount,
                type: 2
            })
            
        

            knex('accounts')
            .where({user_id: account_to_id})
            .first()
            .select()
            .then(function(account_to){
                let balance= account_to.balance + +amount
                console.log(balance)
                knex('accounts')
                .where({id: account_to.id})
                .update({balance})
                .update({updated_at: new Date()})
            })

            knex('accounts')
            .where({user_id: account_from_id})
            .select('id')
            .then(function(account_from){
                knex('accounts')
                .where({user_id: account_to_id})
                .select('id')
                .then(function(account_to){
                    knex('transfers')
                    .insert({
                        transaction_code: 'xxxxxx',
                        account_to: account_to,
                        account_from:account_from,
                        amount: amount,
                        date_time: new Date(),
                        method: 'test'
                    })
                })
            
            })

        })
        .catch(err=>{
            if(err){
                res.status(102).send({err: 'processing'})
            }
        })

        res.status(200).send({msg: 'Transfer Successful'})
               
    }

}

module.exports = {
    deposit,
    withdraw,
    transfer
};