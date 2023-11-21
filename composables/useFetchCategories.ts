export const useFetchCategories = () => {
  const categoriesData = async (query?: object) => await useFetch<ICategory[]>('/api/categories', { query })
  return { categoriesData }
}
