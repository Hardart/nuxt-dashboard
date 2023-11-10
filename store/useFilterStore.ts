type SortBy = 'createdAt' | 'updatedAt' | 'title'
export const useFilterStore = defineStore('filter', () => {
  // STATE
  const orderBy = ref(1)
  const sortBy = ref<keyof IProduct>('createdAt')
  const search = ref('')
  const categoryId = ref('')

  // GETTERS

  // ACTIONS
  function orderDesc() {
    orderBy.value = -1
  }
  function orderAsc() {
    orderBy.value = 1
  }
  function restoreDefaults() {
    orderBy.value = 1
    sortBy.value = 'createdAt'
    search.value = ''
    categoryId.value = ''
  }

  return {
    search,
    categoryId,
    sortBy,
    orderBy,
    orderAsc,
    orderDesc,
    restoreDefaults,
  }
})
