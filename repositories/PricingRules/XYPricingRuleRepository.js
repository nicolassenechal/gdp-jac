'use strict'
const PricingRuleRepository = require('../../repositories/PricingRuleRepository')

class XYPricingRuleRepository extends PricingRuleRepository {
  getFreeQty () {
    return this._pricingRule.freeQty
  }
  getMinCartQty () {
    return this._pricingRule.minCartQty
  }
}

module.exports = XYPricingRuleRepository
