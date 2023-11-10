import apiGET from '@api/get'
import apiPOST from '@api/post'
import { useFilterStore } from './useFilterStore'

export const useProductsStore = defineStore('products', () => {
  // STATE
  const products = ref<IProduct[] | null>(null)
  const firstInit = ref(false)
  const singleProduct = ref<IProduct | null>(null)

  // GETTERS
  const findById = (id: string) => products.value?.find(p => p.id == id) || null
  const findBySlug = (slug: string, categorySlug: string) => products.value?.find(p => p.slug == slug && p.category.slug == categorySlug)

  const sortProducts = () =>
    products.value?.sort((a, b) => {
      const { sortBy, orderBy } = storeToRefs(useFilterStore())
      const valueA = a[sortBy.value]
      const valueB = b[sortBy.value]
      if (valueA !== undefined && valueB !== undefined) return valueA < valueB ? orderBy.value : -orderBy.value
      else return 1
    })
  const getProductsList = () => {
    const { search, categoryId } = storeToRefs(useFilterStore())

    return sortProducts()?.filter(p => p.title.toLocaleLowerCase().includes(search.value) && p.category.id.includes(categoryId.value))
  }
  const getSingleProduct = computed(() => singleProduct)
  const removeProduct = (id: string) => products.value?.filter(p => p.id !== id) || null

  // ACTIONS
  async function loadProductsList() {
    if (firstInit.value) return
    const { data, error, refresh } = await apiGET.getAllProducts<IProduct[]>()
    firstInit.value = !firstInit.value
    products.value = addLinkToProduct(data.value)
  }

  async function updateProductsList(page?: number) {
    const { data, error, refresh } = await apiGET.getAllProducts<IProduct[]>()
    products.value = addLinkToProduct(data.value)
  }

  async function loadWithFilter(filter: object) {
    const data = await apiPOST.filteredProduct<IProduct[]>(filter)
    products.value = data
  }

  async function loadSingleProduct(id: string) {
    singleProduct.value = findById(id)
    if (!singleProduct.value) {
      const { data, error, refresh } = await apiGET.productById<IProduct>(id)

      singleProduct.value = data.value
    }
  }

  async function createOrUpdate(product: FormProduct) {
    const id = await apiPOST.createOrUpdate<string>(product)
    if (!id) return { status: 'fail' }
    return { status: 'ok' }
  }

  async function deleteOne(id: string) {
    const { id: deletedId } = await apiPOST.productDelete<IProduct>(id)
    if (deletedId) products.value = removeProduct(id)
  }

  return {
    products,
    findById,
    findBySlug,
    loadProductsList,
    loadWithFilter,
    loadSingleProduct,
    createOrUpdate,
    deleteOne,
    updateProductsList,
    getProductsList,
    getSingleProduct,
  }
})
