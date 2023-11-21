import { Product } from '../models/Product'

export default defineEventHandler(async event => {
  const query = getQuery(event)

  const products = await Product.find({ $and: [query] })
  const productsCount = await Product.find({ $and: [query] }).count()
  return { products, productsCount }
})
