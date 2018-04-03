'use strict'
const Customer = require('../models/Customer')
const PricingRuleServiceFactory = require('../helpers/PricingRuleServiceFactory')
const Uuidv1 = require('uuid/v1') // https://stackoverflow.com/questions/23327010/how-to-generate-unique-id-with-node-js

class CustomerRepository {
  constructor (customer) {
    if (!customer) {
      customer = new Customer({
        code: Uuidv1(),
        name: 'Guess user'
      })
    }
    this._customer = customer
  }

  findCustomer (code) {
    let customerData = require('../db/customers.json')

    let record = customerData[code]

    if (!record) return

    this._customer = new Customer({
      code: code,
      name: record.name
    })

    record.promotions.forEach(function (promotion) {
      var pricingRuleService = PricingRuleServiceFactory.getPricingRuleService(promotion)
      if (pricingRuleService) {
        this.addPromotion(pricingRuleService)
      }
    }, this)
    return this
  }

  addPromotion (pricingRule) {
    if (!pricingRule) {
      return new Error('') // TODO
    }
    this._customer.promotions.push(pricingRule)
  }

  getPromotions () {
    return this._customer.promotions || []
  }

  getNumberOfPromotions () {
    return this._customer.promotions.length
  }

  clear () {
    this.this._customer.promotions = []
  }
}

module.exports = CustomerRepository
