'use strict'

class Customer {
  constructor (record) {
    this._code = record.code
    this._name = record.name
    this._promotions = record.promotions || []
  }
  get code () {
    return this._code
  }

  get name () {
    return this._name
  }

  get promotions () {
    return this._promotions || []
  }
}

module.exports = Customer
