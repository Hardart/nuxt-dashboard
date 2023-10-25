import apiGet from '@api/get'
export const useProducts = async () => {
  const res = await apiGet.allProduct()
  const products = addLinkToProduct(res)
  return { products }
}
