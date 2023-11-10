import apiGet from '~/api/get'
export const useCategories = () => {
  const getCategories = async () =>
    (await apiGet.categoriesWithProducts()).map(cat => ({ ...cat, link: `/products/${cat.slug}` }))
  const categoryBySlug = async (slug: string) => await apiGet.categoryBySlug(slug)
  const categoriesMeta = async () => await apiGet.categoriesMeta()
  return { getCategories, categoryBySlug, categoriesMeta }
}
