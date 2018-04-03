'use strict'
const PricingRule = require('../PricingRule')

// get 3 for a 2 deal
class XYPricingRule extends PricingRule {
  constructor (code, desc, freeQty, minCartQty) {
    super(code, desc)
    this._freeQty = freeQty
    this._minCartQty = minCartQty
  }
  get freeQty () {
    return this._freeQty
  }
  set freeQty (qty) {
    this._freeQty = qty
  }
  get minCartQty () {
    return this._minCartQty
  }
  set minCartQty (qty) {
    return this._minCartQty
  }
}
module.exports = XYPricingRule
