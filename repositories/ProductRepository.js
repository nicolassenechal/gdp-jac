const Product = require('../models/Product')
let productData = require('../db/products.json')

class ProductRepository {
  getProduct (sku) {
    let record = productData[sku]

    if (!record) return

    return new Product({
      sku: sku,
      name: record.name,
      type: record.type,
      price: record.price
    })
  }
}
module.exports = ProductRepository
