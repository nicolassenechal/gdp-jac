
const PricingRuleService = require('../../services/PricingRuleService')

class XYPricingRuleService extends PricingRuleService {
  applyRules (cartRepo) {
    this._cartRepo = cartRepo
    let promoItems = this._getPromoCartItems()
    let pricingRuleRepo = this._pricingRuleRepo
    if (promoItems.length < pricingRuleRepo.getMinCartQty()) {
      return
    }

    if (pricingRuleRepo.getFreeQty() <= 0) {
      return
    }

    // TODO: group by product type and then check this.
    for (let i = 0; i < pricingRuleRepo.getFreeQty(); i++) {
      let cartItemId = this._cartRepo.addCartItem(promoItems[0].sku)
      let cartItems = this._cartRepo.getCartItems()
      cartItems[cartItemId].price = 0 // freeQty
    }
  }
}

module.exports = XYPricingRuleService
