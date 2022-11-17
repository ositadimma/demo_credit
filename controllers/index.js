const knex = require('../config/knex')


 

const viewAccount= (req, res) => {
    let id= +req.headers.authorization
    knex('users')
    .where({id: id})
    .first()
    .then(user=>{   
        if(!user){
            res.status(404).send({err: 'invalid ID'})
        } else {  
        const token= 'xxxxxx'
        res.setHeader('Authorization', 'Bearer'+token+'_'+user.id)
        knex('accounts')
        .where({user_id: user.id})
        .first()
        .then(account=>{
            res.status(200).json(
                {
                    id: user.id,
                    username: user.username,
                    balance: account.balance
                }
            );

        })
    }
    })
}

module.exports = viewAccount; 