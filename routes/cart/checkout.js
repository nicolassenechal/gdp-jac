var express = require('express')
var CustomerRepository = require('../../repositories/CustomerRepository')
var CartRepository = require('../../repositories/CartRepository')
var CartService = require('../../services/CartServices')
var router = express.Router()

router.post('/', function (req, res, next) {

  var customerRepo = new CustomerRepository()

  if (req.body.cust_id) {
    customerRepo.findCustomer(req.body.cust_id)
  }
  var cartRepo = new CartRepository(customerRepo)

  let cartItems = req.body.cart_items

  for (let sku in cartItems) {
    let qty = cartItems[sku]
    for (let i = 0; i < qty; i++) {
      cartRepo.addCartItem(sku)
    }
  }

  var cartService = new CartService(cartRepo)
  if (!cartService.checkOut()) {
    res.send('Error during the checkout process')
  }

  cartItems = cartService.getCartItems()
  let returnItems = []
  for (let cartItemId in cartItems) {
    let item = cartItems[cartItemId]
    returnItems.push({
      sku: item.sku,
      name: item.name,
      price: item.price
    })
  }

  res.send({
    body: req.body.cart_items,
    cartItems: returnItems,
    total: cartService.getTotal()
  })
})

module.exports = router
