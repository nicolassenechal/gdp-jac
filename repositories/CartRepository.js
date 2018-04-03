'use strict'
const Cart = require('../models/Cart')
const ProductRepository = require('../repositories/ProductRepository')
const Uuidv1 = require('uuid/v1') // https://stackoverflow.com/questions/23327010/how-to-generate-unique-id-with-node-js

class CartRepository {
  constructor (customerRepo) {
    if (!customerRepo) {
      return new Error('')
    }
    this._productRepo = new ProductRepository()
    this._customerRepo = customerRepo
    this._cart = new Cart()
    this._cartItems = this._cart.cartItems
  }

  getCustomer () {
    return this._customerRepo
  }

  addCartItem (sku) {
    if (!sku) {
      return new Error('') // TODO
    }
    let cartItem = this._productRepo.getProduct(sku)
    if (!cartItem) {
      return new Error('') // TODO
    }
    var cartItemId = Uuidv1()
    this._cartItems[cartItemId] = cartItem
    return cartItemId
  }

  removeCartIem (cartItemId) {
    delete this._cartItems[cartItemId]
  }

  getCartItems () {
    return this._cartItems
  }

  getNumberOfCartItems () {
    return Object.keys(this._cartItems).length
  }

  getTotal () {
    let amount = 0
    for (let cartItemId in this._cartItems) {
      amount = amount + this._cartItems[cartItemId].price
    }
    return amount.toFixed(2)
  }

  clear () {
    this._cartItems = {}
  }
}

module.exports = CartRepository
