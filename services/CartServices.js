class CartServices {
  constructor (cartRepo) {
    if (!cartRepo) {
      return new Error()
    }
    this._cartRepo = cartRepo
  }

  checkOut () {
    this.resetPromotionItems()
    // appy pricing rules
    let promotions = this._cartRepo.getCustomer().getPromotions()
    promotions.forEach(function (promotion) {
      promotion.applyRules(this._cartRepo)
    }, this)
    return true
  }

  resetPromotionItems () {
    // TODO
  }

  getCartItems () {
    return this._cartRepo.getCartItems()
  }

  getTotal () {
    return this._cartRepo.getTotal()
  }
}

module.exports = CartServices
