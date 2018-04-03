const assert = require('assert')
const DiscountPricingRule = require('../../../models/PricingRules/DiscountPricingRule')
const DiscountPricingRuleRepository = require('../../../repositories/PricingRules/DiscountPricingRuleRepository')

describe('#discountpricingruleRepository', function () {
  context('get disount pricing rule', function () {
    var code = 'DIS'
    var desc = 'Gets a discount x product where 4 or more are purchased. The price drops to Y per ad'
    var price = 188
    var minCartQty = 1
    var pricingRule = new DiscountPricingRule(code, desc, price, minCartQty)

    var pricingRulesRepo = new DiscountPricingRuleRepository(pricingRule)

    it('Should initiate successfully', function (done) {
      assert.ok(pricingRulesRepo)
      done()
    })

    it('Should be to get freeQty and minCartQty correctly', function (done) {
      assert.equal(pricingRulesRepo.getPrice(), 188, 'discount pricing rule price')

      assert.equal(pricingRulesRepo.getMinCartQty(), 1, 'discount pricing rule min cart qty')

      done()
    })
  }) 
})
