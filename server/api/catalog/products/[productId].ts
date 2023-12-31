export default defineEventHandler(async event => {
  const id = event.context?.params?.productId
  if (!id && typeof id !== 'string') return
  if (id.length < 24) return

  const product = await Product.findById(id).populate({
    path: 'categoryId',
    select: ['-products', '-isPublished', '-createdAt', '-updatedAt'],
  })
  return product
})
