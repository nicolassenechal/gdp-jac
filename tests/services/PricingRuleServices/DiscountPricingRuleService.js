const assert = require('assert')
const Customer = require('../../../models/Customer')
const Cart = require('../../../models/Cart')
const DiscountPricingRule = require('../../../models/PricingRules/DiscountPricingRule')
const CustomerRepository = require('../../../repositories/CustomerRepository')
const DiscountPricingRuleRepository = require('../../../repositories/PricingRules/DiscountPricingRuleRepository')
const CartRepository = require('../../../repositories/CartRepository')

const DiscountPricingRuleService = require('../../../services/PricingRulesServices/DiscountPricingRuleService')

describe('#discountpriceRuleService', function () {
  context('Price Rule Service', function () {
    var pricingRule = new DiscountPricingRule('DIS001', 'Cart Discount', 100, 3) // use args

    var priceRuleRepo = new DiscountPricingRuleRepository(pricingRule)
    priceRuleRepo.addCondition('==', 'sku', 'CLS001')

    var customer = new Customer({
      name: 'GDP',
      code: 'SEEK GDP'
    })
    var customerRepo = new CustomerRepository(customer, [priceRuleRepo])

    var cart = new Cart(customerRepo)
    var cartRepo = new CartRepository(cart)

    cartRepo.addCartItem('CLS001')
    cartRepo.addCartItem('STO001')

    var pricingRuleService = new DiscountPricingRuleService(priceRuleRepo)
    it('Should initiate successfully', function (done) {
      assert.ok(pricingRuleService)
      done()
    })

    it('Should return match cart items based on price rule\'s condition', function (done) {
      pricingRuleService.applyRules(cartRepo)

      cartRepo.addCartItem('CLS001')

      done()
    })
  })
})
