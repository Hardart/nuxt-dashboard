export default {
  async filteredProduct<T>(filter: object) {
    const url = 'http://localhost:4000/api/filter-products'
    return await $fetch<T>(url, { method: 'post', body: { filter } })
  },
  async createOrUpdate<T>(product: FormProduct) {
    const url = 'http://localhost:4000/api/add-product'
    return await $fetch<T>(url, { method: 'post', body: { product } })
  },
  async productBySlug<T>(slug: string, categorySlug: string) {
    const url = 'http://localhost:4000/api/get-product-by-slug'
    return await $fetch<T>(url, { method: 'post', body: { slug, categorySlug } })
  },
  async productDelete<T>(id: string) {
    const url = 'http://localhost:4000/api/delete-product'
    return await $fetch<T>(url, { method: 'post', body: { id } })
  },
  async categoryBySlug<T>(slug: string) {
    const url = 'http://localhost:4000/api/get-category-by-slug'
    return await $fetch<T>(url, { method: 'post', body: { slug } })
  },
}
