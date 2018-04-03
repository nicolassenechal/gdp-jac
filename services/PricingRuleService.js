const ConditionChecker = require('../helpers/ConditionChecker')

class PricingRuleService {
  constructor (PricingRuleRepo) {
    if (!PricingRuleRepo) {
      return new Error()
    }

    this._pricingRuleRepo = PricingRuleRepo

    this._promoCartItems = {}
  }

  applyRules (cartRepo) {
    this._cartRepo = cartRepo
  }

  _getPromoCartItems () {
    if (this._pricingRuleRepo.getNumberOfCondition() === 0) {
      return []
    }

    var cartItems = this._cartRepo.getCartItems()
    var promotCartItems = []

    for (let cartItemId in cartItems) {
      if (this._checkCartItem(cartItems[cartItemId])) {
        promotCartItems.push(cartItems[cartItemId])
      }
    }
    return promotCartItems
  }

  _checkCartItem (cartItem) {
    var conditions = this._pricingRuleRepo.getConditions()
    for (const [, condition] of conditions.entries()) {
      if (!cartItem[condition.fieldName]) {
        continue
      }
      if (!ConditionChecker.match(condition.operand, cartItem[condition.fieldName], condition.value)) {
        continue
      }
      return true
    }
  }
}
module.exports = PricingRuleService
