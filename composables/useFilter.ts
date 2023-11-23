import type { LocationQuery } from 'vue-router'

export const useFilter = (query: LocationQuery) => {
  const defaults = ref({
    limit: '10',
    sort: 'createdAt_desc',
    categoryId: '',
    isPublished: '',
  })

  const filter = ref({
    isPublished: query.isPublished || '',
    categoryId: query.categoryId || '',
    sort: query.sort || defaults.value.sort,
    limit: query.limit || defaults.value.limit,
  })

  const resetFilter = () => (filter.value = { ...defaults.value })

  return { filter, resetFilter, defaults }
}
