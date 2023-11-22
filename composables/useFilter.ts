type SortOrder = 'asc' | 'desc'

const defaults = ref({
  limit: '10',
  sort: 'createdAt_desc',
  categoryId: '',
  isPublished: '',
})
export const useFilter = () => {
  const sortBy = ref('createdAt')
  const sortOrder = ref('desc')
  const sortString = computed(() => `${sortBy.value}_${sortOrder.value}`)
  const AscOrDesc = (order: SortOrder = 'asc') => (sortOrder.value = order)

  return { sortBy, sortOrder, AscOrDesc, sortString, defaults }
}
