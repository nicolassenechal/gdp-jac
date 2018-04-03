'use strict'

class Cart {
  constructor (customerRepo) {
    this._customerRepo = customerRepo
    this._cartItems = {} // TODO think think think
  }

  get customerRepo () {
    return this._customerRepo
  }

  get cartItems () {
    return this._cartItems || {}
  }
  set cartItems (items) {
    items = items || {}
    this._cartItems = items
  }
}

module.exports = Cart
