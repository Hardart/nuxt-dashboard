export const useCreateProducts = () => {
  const upsertProduct = async (product: ProductModel) => await useFetch('/api/products', { method: 'put', body: product })

  return { upsertProduct }
}
