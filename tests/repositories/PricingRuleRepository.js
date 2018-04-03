const assert = require('assert')
const PricingRule = require('../../models/PricingRule')
const PricingRuleRepository = require('../../repositories/PricingRuleRepository')

describe('#xypricingruleRepository', function () {
  context('get a X for Y deal pricing rule', function () {
    var code = 'XY'
    var desc = 'Get a X for Y deal pricing rule'

    var pricingRules = new PricingRule(code, desc)

    var pricingRulesRepo = new PricingRuleRepository(pricingRules)

    it('Should initiate successfully', function (done) {
      assert.ok(pricingRulesRepo)
      done()
    })

    it('Should be able to add/remove conditions', function (done) {

      pricingRulesRepo.addCondition('==', 'code', 'UNILEVER')

      assert.equal(pricingRulesRepo.getNumberOfCondition(), 1, 'number of conditions')

      pricingRulesRepo.addCondition('==', 'code', 'UNILEVER')

      assert.equal(pricingRulesRepo.getNumberOfCondition(), 1, 'number of conditions')
  
      pricingRulesRepo.addCondition('==', 'code', 'APPLE')

      assert.equal(pricingRulesRepo.getNumberOfCondition(), 2, 'number of conditions')

      pricingRulesRepo.removeCondition('==', 'code', 'APPLE')

      assert.equal(pricingRulesRepo.getNumberOfCondition(), 1, 'number of conditions')

      pricingRulesRepo.removeCondition('==', 'code', 'UNILEVER')

      assert.equal(pricingRulesRepo.getNumberOfCondition(), 0, 'number of conditions')     

      done()
    })
  })
})
