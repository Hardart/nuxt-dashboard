import { Types } from 'mongoose'
export default defineEventHandler(async event => {
  const { id } = await readBody(event)
  if (!id)
    throw createError({
      statusCode: 400,
      statusMessage: 'Should be ID',
    })
  const product = await Product.findByIdAndDelete(id)
  if (product) await Category.findByIdAndUpdate(product.categoryId, { $pull: { products: new Types.ObjectId(id) } })
  return product
})
