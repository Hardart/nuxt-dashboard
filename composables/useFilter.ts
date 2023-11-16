export const useFilter = () => {
  const filterTemplate: IFilter = {
    categoryId: '',
    isPublished: '',
    sort: `createdAt_desc`,
  }
  const sortBy = ref('createdAt')
  const sortOrder = ref('desc')

  const filter = ref(getQueryFromUrl())

  function getQueryFromUrl(): IFilter {
    const { query } = useRoute()
    const categoryId = query.categoryId ? `${query.categoryId}` : ''
    const isPublished = query.isPublished ? `${query.isPublished}` : ''
    const sort = query.sort ? `${query.sort}` : 'createdAt_desc'
    return { categoryId, isPublished, sort }
  }

  function getFilterParams(filterObject: Ref<IFilter> = filter) {
    const clone = { ...filterObject.value }
    const keys = keysFromObject<IFilter>(filterObject.value)
    keys.forEach(key => {
      if (filterObject.value[key] == filterTemplate[key]) delete clone[key]
    })

    return clone
  }

  const setSortParams = (f: Ref<IFilter> = filter) => (f.value.sort = `${sortBy.value}_${sortOrder.value}`)

  const restoreFilter = () => {
    filter.value = { ...filterTemplate }
    sortBy.value = 'createdAt'
    sortOrder.value = 'desc'
  }

  return { filter, filterTemplate, sortBy, sortOrder, getFilterParams, restoreFilter, setSortParams }
}
