
exports.up = function(knex) {
    return knex.schema
    .createTable('users', users => {
        users.increments()
        users.string('name', 255)
        .notNullable()
    })
    .createTable('product', product => {
        product.increments()
        product.string('name', 255)
        .notNullable()
        product.string('description', 1024)
        .notNullable()
        product.string('price', 50)
        .notNullable()
    })
    .createTable('addresses', addresses => {
        addresses.increments()
        addresses.string('name', 128)
        .notNullable()
        addresses.string('address', 1024)
        .notNullable()
        addresses.integer('user_id')
            .unsigned()
            .references('users.id')
    })
    .createTable('purchases', purchases => {
        purchases.increments()
        purchases.timestamp('created_at').defaultTo(knex.fn.now())
        purchases.integer('user_id')
            .unsigned()
            .references('user.id')
        purchases.integer('addresses_id')
            .unsigned()
            .references('addresses.id')
    }) 
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('purchases')
  .dropTableIfExists('addresses')
  .dropTableIfExists('product')
  .dropTableIfExists('users')
};
