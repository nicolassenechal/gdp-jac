'use strict'
const PricingRule = require('../models/PricingRule')

class PricingRuleRepository {
  constructor (pricingRule, conditions) {
    if (!pricingRule) {
      this._pricingRule = new PricingRule()
    }
    this._pricingRule = pricingRule
    this._conditions = conditions || []
  }

  _findCondition (operand, fieldName, value, removeIfFound = false) {
    return !this._conditions.every(function (condition, index) {
      if (condition.operand === operand &&
        condition.fieldName === fieldName &&
        condition.value === value) {
        if (removeIfFound) {
          this._conditions.splice(index, 1)
        }
        return false
      }
      return true
    }, this)
  }

  addCondition (operand, fieldName, value) {
    // dont allow duplicate condition
    if (this._findCondition(operand, fieldName, value)) {
      return
    }
    this._conditions.push({
      operand: operand,
      fieldName: fieldName,
      value: value
    })
  }

  removeCondition (operand, fieldName, value) {
    return this._findCondition(operand, fieldName, value, true)
  }

  getConditions () {
    return this._conditions
  }

  getNumberOfCondition () {
    return this._conditions.length
  }
}

module.exports = PricingRuleRepository
