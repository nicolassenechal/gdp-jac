'use strict'
const PricingRule = require('../PricingRule')

class DiscountPricingRule extends PricingRule {
  constructor (code, desc, price, minCartQty) {
    super(code, desc)
    this._price = price
    this._minCartQty = minCartQty
  }
  get price () {
    return this._price
  }
  set price (price) {
    this._price = price
  }
  get minCartQty () {
    return this._minCartQty
  }
  set minCartQty (minCartQty) {
    this._minCartQty = this.minCartQty
  }
}
module.exports = DiscountPricingRule
