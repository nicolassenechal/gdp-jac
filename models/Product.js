'use strict'

class Product {
  constructor (record) {
    this._sku = record.sku
    this._name = record.name
    this._type = record.type
    this._price = record.price
  }

  get sku () {
    return this._sku
  }

  get type () {
    return this._type
  }

  get name () {
    return this._name
  }

  get price () {
    return this._price
  }
  set price (price) {
    this._price = price
  }
}

module.exports = Product
