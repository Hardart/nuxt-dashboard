import apiGET from '@api/get'
import apiPOST from '@api/post'

interface IProductsData {
  products: IProduct[]
  productsCount: number
}

export const useProductsStore = defineStore('products', () => {
  // STATE
  const productsList = ref<Maybe<IProduct[]>>(null)
  const singleProduct = ref<IProduct | null>(null)
  const selectedProduct = ref<Maybe<IProduct>>(null)
  const productModel = ref<Maybe<ProductModel>>({
    title: '',
    categoryId: '0',
    subtitle: '',
    slug: '',
    price: '',
    description: '',
    type: '',
    image: '',
    isPublished: false,
    features: {
      class: '',
      price: '',
      weight: '',
      height: {
        min: '',
        max: '',
      },
    },
  })
  const productsCount = ref(0)

  // GETTERS
  const findById = (id: string) => productsList.value?.find(p => p.id == id) || null
  const filterById = (id: string) => productsList.value?.filter(p => p.id !== id) || null

  // ACTIONS

  // ЗАГРУЗКА СПИСКА И КОЛИЧЕСТВА ПРОДКУТОВ
  async function loadProductsList() {
    const route = useRoute()
    const { data } = await apiGET.getAllProducts<IProductsData>(route.query)
    const { products, productsCount: count } = satisfiedProductsData(data)
    productsCount.value = count
    productsList.value = addLinkToProducts(products)
  }

  async function loadSingleProduct(id: string) {
    productModel.value = null
    const { data } = await apiGET.productById<IProduct>(id)
    createProductModel(data)
  }

  async function createOrUpdate(product: ProductModel) {
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

  function createProductModel(product: Ref<Maybe<IProduct>>) {
    if (product.value) {
      const productClone = deepCloneObject<IProduct>(product.value)
      productModel.value = { ...productModel.value, ...productClone, categoryId: product.value.category.id }
      if ('category' in productModel.value) delete productModel.value.category
    }
  }

  return {
    productsList,
    productsCount,
    selectedProduct,
    loadProductsList,
    findById,
    loadSingleProduct,
    createOrUpdate,
    deleteOne,
    deleteOneWithAction,
    productModel,
  }
})

function satisfiedProductsData(data: Ref<IProductsData | null>) {
  if (!data.value) throw createError('Some error with products first fetch')
  return data.value
}
