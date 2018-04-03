const assert = require('assert')
const Customer = require('../../../models/Customer')
const Cart = require('../../../models/Cart')
const XYPricingRule = require('../../../models/PricingRules/XYPricingRule')
const CustomerRepository = require('../../../repositories/CustomerRepository')
const XYPricingRuleRepository = require('../../../repositories/PricingRules/XYPricingRuleRepository')
const CartRepository = require('../../../repositories/CartRepository')

const XYPricingRuleService = require('../../../services/PricingRulesServices/XYPricingRuleService')

describe('#xypriceRuleService', function () {
  context('Price Rule Service', function () {
    var pricingRule = new XYPricingRule('DIS001', 'Cart Discount', 1, 3) // use args

    var pricingRuleRepo = new XYPricingRuleRepository(pricingRule)
    pricingRuleRepo.addCondition('==', 'sku', 'CLS001')

    var customer = new Customer({
      name: 'GDP',
      code: 'SEEK GDP'
    })
    var customerRepo = new CustomerRepository(customer, [pricingRuleRepo])

    var cart = new Cart(customerRepo)
    var cartRepo = new CartRepository(cart)

    cartRepo.addCartItem('CLS001')
    cartRepo.addCartItem('CLS001')
    cartRepo.addCartItem('STO001')

    var pricingRuleService = new XYPricingRuleService(pricingRuleRepo)
    it('Should initiate successfully', function (done) {
      assert.ok(pricingRuleService)
      done()
    })

    it('Should return match cart items based on price rule\'s condition', function (done) {
      pricingRuleService.applyRules(cartRepo)
      assert.equal(cartRepo.getNumberOfCartItems(), 3, 'CLASSIC job ad = 3')

      cartRepo.addCartItem('CLS001')
      pricingRuleService.applyRules(cartRepo)
      assert.equal(cartRepo.getNumberOfCartItems(), 5, 'CLASSIC job ad = 5 after promotion apply')

      done()
    })
  })
})
