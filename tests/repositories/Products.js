const assert = require('assert')
const Product = require('../../models/Product')
const ProductRepository = require('../../repositories/ProductRepository')

describe('#products', function () {
  var productsRepository = new ProductRepository()
  context('Search for product', function () {
    it('should return undefined if search by undefined sku', function (done) {
      assert.equal(typeof (productsRepository.getProduct()), 'undefined')
      done()
    })

    it('should return undefined if search by empty sku', function (done) {
      assert.equal(typeof (productsRepository.getProduct('')), 'undefined')
      done()
    })

    it('should return undefined if search by non existing sku', function (done) {
      assert.equal(typeof (productsRepository.getProduct('TEST')), 'undefined')
      done()
    })

    it('should return undefined if search by number', function (done) {
      assert.equal(typeof (productsRepository.getProduct(100)), 'undefined')
      done()
    })

    var sku = 'CLS001'
    var testProduct = productsRepository.getProduct(sku)
    it('should return valid product object if search by valid sku', function (done) {
      assert.ok(testProduct instanceof Product)
      assert.equal(testProduct.sku, sku, 'product sku')
      assert.equal(testProduct.name, 'Classic Job Adverstisement', 'product name')
      assert.equal(testProduct.type, 'CLASSIC', 'product type')
      assert.equal(testProduct.price, 269.99, 'product price')
      testProduct.price = 10
      assert.equal(testProduct.price, 10, 'able to set product price to 10')
      done()
    })
  })
})
