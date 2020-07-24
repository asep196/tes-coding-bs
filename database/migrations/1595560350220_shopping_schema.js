'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ShoppingSchema extends Schema {
  up () {
    this.create('shoppings', (table) => {
      table.increments()
      table.string('name', 45)
      table.timestamps()
    })
  }

  down () {
    this.drop('shoppings')
  }
}

module.exports = ShoppingSchema
