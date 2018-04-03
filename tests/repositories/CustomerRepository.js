const assert = require('assert')
const Customer = require('../../models/Customer')
const PricingRule = require('../../models/PricingRule')
const CustomerRepository = require('../../repositories/CustomerRepository')


describe('#customerrepository', function () {
  context('Create customer repositoty', function () {
    var customer = new Customer({
      code: 'UNILEVER',
      name: 'UNILEVER PTD LTD'
    })

    var customerRepo = new CustomerRepository(customer)
    it('Should initiate successfully', function (done) {
      assert.ok(customerRepo)
      assert.equal(customerRepo.getNumberOfPromotions(), 0, 'Promotions should be empty when initiate')
      done()
    })

    it('Should be able to add/remove promotion items', function (done) {
      let pricingRule = new PricingRule('XY', 'get a X for Y deal')

      customerRepo.addPromotion(pricingRule)

      assert.equal(customerRepo.getNumberOfPromotions(), 1, 'Promotions should be one when added')

      pricingRule = new PricingRule('Discount', 'Discount')

      customerRepo.addPromotion(pricingRule)

      assert.equal(customerRepo.getNumberOfPromotions(), 2, 'Promotions should be two when add second promotion')

      done()
    })
  })
})
