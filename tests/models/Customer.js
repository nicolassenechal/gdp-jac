const assert = require('assert')
const Customer = require('../../models/Customer')

describe('#customer', function () {
  context('When create customer', function () {
    var code = 'GDP'
    var name = 'Seek GDP'
    var promotions = []

    var customer = new Customer({
      code: code,
      name: name,
      promotions: promotions
    })

    it('Should be able to initiate successfully', function (done) {
      assert.ok(customer)
      done()
    })

    it('Should set the attributes properly', function (done) {
      assert.equal(customer.code, code, 'Code')
      assert.equal(customer.name, name, 'Name')
      assert.equal(customer.promotions, promotions, 'Promotions')
      done()
    })
  })
})
