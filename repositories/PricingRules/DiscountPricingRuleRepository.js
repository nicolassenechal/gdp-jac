'use strict'
const PricingRuleRepository = require('../../repositories/PricingRuleRepository')

class DiscountPricingRuleRepository extends PricingRuleRepository {
  getPrice () {
    return this._pricingRule.price
  }
  getMinCartQty () {
    return this._pricingRule.minCartQty
  }
}

module.exports = DiscountPricingRuleRepository
