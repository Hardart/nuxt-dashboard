export default defineEventHandler(async event => {
  const product: ProductModel = await readBody(event)
  if (!product.categoryId || !product.slug)
    throw createError({
      statusCode: 400,
      statusMessage: 'Should be KEY - categoryId',
    })
  const { categoryId, slug } = product
  const newProduct = await Product.findOneAndUpdate({ categoryId, slug }, product, { upsert: true, new: true }).populate('categoryId', [
    '-products',
    '-createdAt',
    '-updatedAt',
  ])
  await Category.updateOne({ _id: categoryId }, { $addToSet: { products: newProduct.id } })
  return newProduct
})
