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

  var cartItems = req.body.cart_items

  for (let sku in cartItems) {
    let qty = cartItems[sku]
    for (let i = 0; i < qty; i++) {
      cartRepo.addCartItem(sku)
    }
  }

  var cartService = new CartService(cartRepo)
  if (!cartService.checkOut()) {
    res.send('Not Ok')
  }

  res.send({
    cartItems: cartService.getCartItems(),
    total: cartService.getTotal()
  })
})

module.exports = router
