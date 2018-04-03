const assert = require('assert')
const Product = require('../../models/Product')

describe('#product', function () {
  context('When create product', function () {
    var sku = 'STD001'
    var name = 'Standard package'
    var type = 'STD'
    var price = 288.80

    var product = new Product({
      sku: sku,
      type: type,
      name: name,
      price: price
    })

    it('Should be able to initiate successfully', function (done) {
      assert.ok(product)
      done()
    })

    it('Should set the attributes properly', function (done) {
      assert.equal(product.sku, sku, 'Sku')
      assert.equal(product.name, name, 'Name')
      assert.equal(product.type, type, 'Type')
      assert.equal(product.price, price, 'Price')
      done()
    })
  })
})
