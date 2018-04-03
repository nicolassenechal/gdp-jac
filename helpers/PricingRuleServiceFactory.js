'use strict'
const XYPricingRule = require('../models/PricingRules/XYPricingRule')
const XYPricingRuleRepo = require('../repositories/PricingRules/XYPricingRuleRepository')
const XYPricingRuleService = require('../../jobAds/services/PricingRulesServices/XYPricingRuleService')

const DiscountPricingRule = require('../models/PricingRules/DiscountPricingRule')
const DiscountPricingRuleRepo = require('../repositories/PricingRules/DiscountPricingRuleRepository')
const DiscountPricingRuleService = require('../../jobAds/services/PricingRulesServices/DiscountPricingRuleService')

class PricingRuleServiceFactory {
  static _getPricingRuleServices (options) {
    return {
      'XY': this._createXYPricingRuleService,
      'DIS': this._createDiscountPricingRuleService
    }
  }
  static getPricingRuleService (options) {
    if (!options.type) {
      return new Error('') // TODO
    }
    let pricingRuleServices = this._getPricingRuleServices()
    if (!pricingRuleServices[options.type]) {
      return new Error('') // TODO
    }
    let service = pricingRuleServices[options.type]
    return service(options)
  }

  static _createXYPricingRuleService (options) {
    let msg = `Get a ${options.freeQty + options.minCartQty} for ${options.minCartQty} deal`
    let pricingRule = new XYPricingRule(options.type, msg, options.freeQty, options.minCartQty)
    let conditionObjs = options.conditions.map(x => {
      return { operand: x[0], fieldName: x[1], value: x[2] }
    })
    let pricingRuleRepo = new XYPricingRuleRepo(pricingRule, conditionObjs)
    return new XYPricingRuleService(pricingRuleRepo)
  }
  static _createDiscountPricingRuleService (options) {
    let msg = `Gets a discount where ${options.minCartQty} or more are purchased. The price drops to ${options.price} per ad`
    let pricingRule = new DiscountPricingRule(options.type, msg, options.price, options.minCartQty)
    let conditionObjs = options.conditions.map(x => {
      return { operand: x[0], fieldName: x[1], value: x[2] }
    })
    let pricingRuleRepo = new DiscountPricingRuleRepo(pricingRule, conditionObjs)
    return new DiscountPricingRuleService(pricingRuleRepo)
  }
}
module.exports = PricingRuleServiceFactory
