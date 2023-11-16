import apiGET from '@api/get'
import apiPOST from '@api/post'

export const useCategoriesStore = defineStore('categories', () => {
  // STATE
  const categoryList = ref<Maybe<ICategory[]>>(null)
  const singleCategory = ref<Maybe<ICategory>>(null)
  const selectedCategory = ref<Maybe<ICategory>>(null)
  const firstInit = ref(false)
  const totalCategories = ref(0)

  // GETTERS
  const findById = (id: string) => categoryList.value?.find(p => p.id == id)
  const filterById = (id: string) => categoryList.value?.filter(p => p.id !== id)

  // const getPaginationPages = computed(() => Math.ceil(totalProducts.value / productsLimit.value))

  // ACTIONS
  async function initCategoryList() {
    if (firstInit.value) return
    loadCategoryList()
    firstInit.value = !firstInit.value
  }

  async function loadCategoryList() {
    const { data, error } = await apiGET.getAllCategories<ICategory[]>()
    if (error.value) console.log(error.value)
    categoryList.value = addLinkToCategories(data.value)
  }

  return {
    categoryList,
    selectedCategory,
    initCategoryList,
    findById,
  }
})
