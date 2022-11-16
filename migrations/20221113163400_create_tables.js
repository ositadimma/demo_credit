/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('users', (table)=>{
        table.increments('id').unsigned()
        table.string('first_name')
        table.string('middle_name')
        table.string('last_name')
        table.string('email_address')
        table.string('username')
        table.string('password')
        table.string('country')
        table.datetime('created_at').defaultTo(knex.fn.now())
        table.datetime('updated_at').defaultTo(knex.fn.now())

    })
    .createTable('accounts', (table)=>{
        table.increments('id')
        table.integer('user_id').unsigned().references('id').inTable('users')
        table.integer('balance')
        table.datetime('created_at').defaultTo(knex.fn.now())
        table.datetime('updated_at').defaultTo(knex.fn.now())
    })
    .createTable('withdrawals', (table)=>{

        table.increments('id')
        table.string('transaction_code')
        table.integer('account_id').unsigned().references('id').inTable('accounts') //foreign key
        table.integer('amount')
        table.date('date_time')
        table.string('method')
        table.integer('status')  //(0)pending, (1)successful, (2)rejected
        table.string('remarks')
        
    })
    .createTable('deposits', (table)=>{

        table.increments('id')
        table.string('transaction_code')
        table.integer('account_id').unsigned().references('id').inTable('accounts')  //foreign key
        table.integer('amount')
        table.datetime('date_time').defaultTo(knex.fn.now())
        table.string('method') //paypal e.t.c
        table.integer('status')  //(0)pending, (1)successful, (2)rejected
        table.string('remarks')
        
    })
    .createTable('transfers', (table)=>{
        table.increments('id')
        table.string('transaction_code')
        table.integer('account_to').unsigned().references('id').inTable('accounts') //foreign key
        table.integer('account_from').unsigned().references('id').inTable('accounts') //foreign key
        table.integer('amount')
        table.date('date_time')
        table.string('method') //paypal e.t.c
        table.integer('status')  //(0)pending, (1)successful, (2)rejected
        table.string('remarks')
    
    })
    .createTable('transaction_log', (table)=>{

        table.increments('id')
        table.integer('account_id').unsigned().references('id').inTable('accounts')  //foreign key
        table.integer('amount')
        table.integer('type') //(0)deposit, (1)withdrawal, (2)transfer
        table.integer('status')  //(0)pending, (1)successful, (2)rejected
        
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  knex.schema.dropTable('users').dropTable('accounts').dropTable('withdrawals')
             .dropTable('deposits').dropTable('transfers').dropTable('transaction_log')
};

exports.config = { transaction: false };



