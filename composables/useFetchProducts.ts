export const useFetchProducts = () => {
  async function productsData(query?: object) {
    const key = `products/` + JSON.stringify(query)
    const nuxtApp = useNuxtApp()
    return await useFetch<IProductsData>('/api/products', { query, key, getCachedData: key => nuxtApp.payload.data[key] })
  }
  async function productData() {
    const route = useRoute()
    const id = route.params.productId
    const key = `products/` + JSON.stringify(id)
    const nuxtApp = useNuxtApp()
    return await useFetch<IProduct>(`/api/catalog/products/${id}`, {
      query: route.query,
      key,
      getCachedData: key => nuxtApp.payload.data[key],
    })
  }

  return { productsData, productData }
}
