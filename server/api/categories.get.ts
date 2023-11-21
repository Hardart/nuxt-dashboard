import { Category } from '../models/Category'

export default defineEventHandler(async event => {
  const query = getQuery(event)
  const categories = await Category.find()
  return categories
})
