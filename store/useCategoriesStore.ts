import api from '@api/get'

export const useCategoriesStore = defineStore('categories', () => {
  // STATE
  const categories = ref<ICategory[] | null>([])
  const firstInit = ref(false)

  // GETTERS
  const getCategoriesList = computed(() => categories)
  const getCategory = (slug: string) => categories.value?.find(cat => cat.slug === slug)

  // ACTIONS
  const loadCategoriesList = async () => {
    if (firstInit.value) return
    const { data, refresh, error } = await api.getAllCategories<ICategory[]>()
    firstInit.value = !firstInit.value
    categories.value = addLinkToCategory(data.value)
    return { status: 'ok' }
  }

  return {
    categories,
    getCategoriesList,
    loadCategoriesList,
    getCategory,
  }
})
