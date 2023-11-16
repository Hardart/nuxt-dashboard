export default {
  async getAllProducts<T>(query?: object) {
    const url = 'http://localhost:4000/api/products'
    const key = 'products' + JSON.stringify(query)
    const nuxtApp = useNuxtApp()
    return await useFetch<T>(url, { query, key, getCachedData: key => nuxtApp.payload.data[key] })
  },
  async getProductsCount() {
    const url = 'http://localhost:4000/api/products-count'
    return await useFetch<number>(url)
  },
  async getAllCategories<T>() {
    const url = 'http://localhost:4000/api/categories'
    return await useFetch<T>(url)
  },
  async productById<T>(id: string) {
    const url = 'http://localhost:4000/api/get-product-by-id'
    return await useFetch<T>(url, { query: { id } })
  },
  async testData<T>(total: Ref<number>, _page: number = 1, _limit: number = 7) {
    const url = 'https://jsonplaceholder.typicode.com/posts'
    return await useFetch<T>(url, {
      params: { _limit, _page },
      onResponse({ response }) {
        const totalPagesCount = response.headers.get('X-Total-Count')
        if (totalPagesCount && typeof totalPagesCount == 'string') total.value = parseInt(totalPagesCount)
      },
    })
  },
}
