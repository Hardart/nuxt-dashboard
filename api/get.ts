export default {
  async getAllProducts<T>() {
    const url = 'http://localhost:4000/api/products'
    return await useFetch<T>(url)
  },
  async getAllCategories<T>() {
    const url = 'http://localhost:4000/api/categories'
    return await useFetch<T>(url)
  },
  async productById<T>(id: string) {
    const url = 'http://localhost:4000/api/get-product-by-id'
    return await useFetch<T>(url, { query: { id } })
  },
  async testData<T>(total: Ref<string | null>, _page: number = 1, _limit: number = 7) {
    const url = 'https://jsonplaceholder.typicode.com/posts'
    return await useFetch<T>(url, {
      params: { _limit, _page },
      onResponse({ request, response, options }) {
        total.value = response.headers.get('X-Total-Count')
      },
    })
  },
}
