import productsController from '../controllers/products-controller'
import { Product } from '../models/Product'

export default defineEventHandler(async event => {
  const products = Product.find().limit(200)
  return products
})
