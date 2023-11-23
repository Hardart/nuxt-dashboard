export default defineEventHandler(async event => {
  const { filter, sort, page, limit } = event.context.query as IFilterQueryParams

  const products = await Product.find(filter)
    .select(['title', 'createdAt', 'updatedAt', 'isPublished'])
    .limit(limit)
    .skip(page * limit)
    .sort(sort || { createdAt: 'desc' })
  const productsCount = await Product.find(filter).count()
  return { products, productsCount }
})
