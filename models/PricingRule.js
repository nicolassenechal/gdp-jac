'use strict'

class PricingRule {
  constructor (code, desc) {
    this._code = code
    this._description = desc
  }

  get code () {
    return this._code
  }
  get description () {
    return this._description
  }
}

module.exports = PricingRule
