const PricingRuleService = require('../../services/PricingRuleService')

class DiscountPricingRuleService extends PricingRuleService {
  applyRules (cartRepo) {
    this._cartRepo = cartRepo
    let promoItems = this._getPromoCartItems()
    let pricingRuleRepo = this._pricingRuleRepo

    if (promoItems.length < pricingRuleRepo.getMinCartQty()) {
      return
    }

    let price = pricingRuleRepo.getPrice()
    if (price < 0) {
      return
    }
    // TODO: group by product type and then check this.
    for (let i = 0; i < promoItems.length; i++) {
      promoItems[i].price = price
    }
  }
}

module.exports = DiscountPricingRuleService
