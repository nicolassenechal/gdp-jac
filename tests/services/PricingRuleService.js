const assert = require('assert')
const Customer = require('../../models/Customer')
const Cart = require('../../models/Cart')
const PriceRule = require('../../models/PricingRule')
const CustomerRepository = require('../../repositories/CustomerRepository')
const PriceRuleRepository = require('../../repositories/PricingRuleRepository')
const CartRepository = require('../../repositories/CartRepository')

const PricingRuleService = require('../../services/PricingRuleService')

describe('#priceRuleService', function () {
  context('Price Rule Service', function () {

    var priceRule = new PriceRule({
      code: 'DIS001',
      Desc: 'Cart Discount'
    })

    var priceRuleRepo = new PriceRuleRepository(priceRule)
    priceRuleRepo.addCondition('==', 'sku', 'CLS001')

    var customer = new Customer({
      name: 'GDP',
      code: 'SEEK GDP'
    })
    var customerRepo = new CustomerRepository(customer, [priceRuleRepo])

    var cart = new Cart(customerRepo)
    var cartRepo = new CartRepository(cart)

    cartRepo.addCartItem('CLS001')
    cartRepo.addCartItem('CLS001')
    cartRepo.addCartItem('CLS001')
    cartRepo.addCartItem('STO001')

    var pricingRuleService = new PricingRuleService(priceRuleRepo)
  
    it('Should initiate successfully', function (done) {
      assert.ok(pricingRuleService)
      done()
    })
    pricingRuleService.applyRules(cartRepo)
    it('Should return match cart items based on price rule\'s condition', function (done) {
      let promoItems = pricingRuleService._getPromoCartItems()
      assert.equal(promoItems.length, 3, 'CLASSIC job ad = 3')

      priceRuleRepo.addCondition('==', 'sku', 'STO001')

      promoItems = pricingRuleService._getPromoCartItems()
      assert.equal(promoItems.length, 4, 'Total match job ad = 4')
      done()
    })

  })
})