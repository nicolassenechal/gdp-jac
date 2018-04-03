const assert = require('assert')
const XYPricingRule = require('../../../models/PricingRules/XYPricingRule')
const XYPricingRuleRepository = require('../../../repositories/PricingRules/XYPricingRuleRepository')

describe('#xypricingruleRepository', function () {
  context('get a X for Y deal pricing rule', function () {
    var code = 'XY'
    var desc = 'Get a X for Y deal pricing rule'
    var freeQty = 1
    var minCartQty = 2
    var pricingRule = new XYPricingRule(code, desc, freeQty, minCartQty)

    var pricingRulesRepo = new XYPricingRuleRepository(pricingRule)

    it('Should initiate successfully', function (done) {
      assert.ok(pricingRulesRepo)
      done()
    })

    it('Should be to get freeQty and minCartQty correctly', function (done) {
      assert.equal(pricingRulesRepo.getFreeQty(), 1, 'xy pricing rule free qty')

      assert.equal(pricingRulesRepo.getMinCartQty(), 2, 'xy pricing rule min cart qty')

      done()
    })
  })
})
