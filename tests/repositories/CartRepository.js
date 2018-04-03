const assert = require('assert')
const Customer = require('../../models/Customer')
const CustomerRepository = require('../../repositories/CustomerRepository')
const CartRepository = require('../../repositories/CartRepository')

describe('#cart', function () {
  context('Cart', function () {
    var customer = new Customer({
      name: 'GDP',
      code: 'SEEK GDP'
    })
    var CustomerRepo = new CustomerRepository(customer)

    var cartRepo = new CartRepository(CustomerRepo)

    it('Should initiate successfully', function (done) {
      assert.ok(cartRepo)
      done()
    })

    it('Should return error if invalid cart item added', function (done) {
      let result = cartRepo.addCartItem('')
      assert.ok(result instanceof Error)

      result = cartRepo.addCartItem('@#$')
      assert.ok(result instanceof Error)

      assert.equal(cartRepo.getNumberOfCartItems(), 0, 'number of cart items')
      done()
    })

    it('Should be able to add cart item based on sku', function (done) {
      let cartItemId = cartRepo.addCartItem('CLS001')

      assert.ok(typeof (cartItemId) !== 'undefined')

      let cartItems = cartRepo.getCartItems()

      assert.equal(cartRepo.getNumberOfCartItems(), 1, 'number of cart items')

      let cartItem = cartItems[cartItemId]
      assert.equal(cartItem.sku, 'CLS001', 'Sku')
      assert.equal(cartItem.name, 'Classic Job Adverstisement', 'Name')
      assert.equal(cartItem.type, 'CLASSIC', 'Type')
      assert.equal(cartItem.price, 269.99, 'Price')

      cartRepo.addCartItem('CLS001')

      assert.equal(cartRepo.getNumberOfCartItems(), 2, 'number of cart items')

      cartRepo.removeCartIem(cartItemId)

      assert.equal(cartRepo.getNumberOfCartItems(), 1, 'number of cart items')

      cartRepo.clear()

      assert.equal(cartRepo.getNumberOfCartItems(), 0, 'number of cart items')
      done()
    })
  })
})
