import apiGET from '@api/get'
import apiPOST from '@api/post'

interface IProductsData {
  products: IProduct[]
  productsCount: number
}

export const useProductsStore = defineStore('products', () => {
  // STATE
  // const { page, limit, itemsCount, pagesCount } = usePaginaton()
  const productsList = ref<Maybe<IProduct[]>>(null)
  const singleProduct = ref<IProduct | null>(null)
  const selectedProduct = ref<Maybe<IProduct>>(null)
  const firstInit = ref(false)
  const productsCount = ref(0)

  // GETTERS
  const findById = (id: string) => productsList.value?.find(p => p.id == id) || null
  const filterById = (id: string) => productsList.value?.filter(p => p.id !== id) || null

  // ACTIONS

  // ИНИЦИАЛИЗАЦИЯ ПРОДКУТОВ
  async function initProductsList() {
    const { getFilterParams } = useFilter()
    const query = getFilterParams()
    loadProductsList(query)
  }

  // ЗАГРУЗКА СПИСКА И КОЛИЧЕСТВА ПРОДКУТОВ
  async function loadProductsList(query?: IFilter) {
    const { data } = await apiGET.getAllProducts<IProductsData>(query)
    const { products, productsCount: count } = satisfiedProductsData(data)
    productsCount.value = count
    productsList.value = addLinkToProducts(products)
  }

  // ЗАГРУЗКА ПРОДКУТОВ С ФИЛЬТРОМ
  async function loadProductsListWithFilter(filter: Ref<IFilter>) {
    const route = useRoute()
    const router = useRouter()
    const { getFilterParams } = useFilter()
    const query = getFilterParams(filter)

    router.push({ path: route.path, query })
    loadProductsList(query)
  }

  async function loadSingleProduct(id: string) {
    singleProduct.value = findById(id)
    if (!singleProduct.value) {
      const { data, error, refresh } = await apiGET.productById<IProduct>(id)
      singleProduct.value = data.value
    }
  }

  async function createOrUpdate(product: FormProduct) {
    const newProduct = await apiPOST.createOrUpdate<IProduct>(product)
    if (!newProduct) return { status: 'fail' }
    return { status: 'ok' }
  }

  async function deleteOne() {
    const product = selectedProduct.value
    if (!product) return
    const { id: deletedId } = await apiPOST.productDelete<IProduct>(product.id)
    if (!deletedId) return { status: 'fail' }
    productsList.value = filterById(product.id)
    productsCount.value--
    return { status: 'ok' }
  }

  function deleteOneWithAction(handler: () => void) {
    return async () => {
      await deleteOne()
      handler()
    }
  }

  //HELPERS

  // function sortingHandler({ sortBy, sortOrder }: IFilter) {
  //   return (a: IProduct, b: IProduct) => {
  //     const valueA = a[sortBy]
  //     const valueB = b[sortBy]
  //     if (sortBy == 'title') return valueA > valueB ? sortOrder : -sortOrder
  //     else return valueA < valueB ? sortOrder : -sortOrder
  //   }
  // }

  return {
    productsList,
    productsCount,
    selectedProduct,

    initProductsList,
    loadProductsList,
    findById,
    loadSingleProduct,
    createOrUpdate,
    deleteOne,
    deleteOneWithAction,
    loadProductsListWithFilter,
    singleProduct,
  }
})

function satisfiedProductsData(data: Ref<IProductsData | null>) {
  if (!data.value) throw createError('Some error with products first fetch')
  return data.value
}
