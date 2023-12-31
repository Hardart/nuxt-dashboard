interface IProductsData {
  products: IProduct[]
  productsCount: number
}

export const useProductsStore = defineStore('products', () => {
  // STATE
  const { productsData, productData } = useFetchProducts()
  const isPending = ref(false)
  const isSinglePending = ref(true)
  const productsList = ref<Maybe<IProduct[]>>(null)
  const selectedProduct = ref<Maybe<IProduct>>(null)
  const productModel = ref<ProductModel>({
    title: '',
    categoryId: '',
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
    const { query } = useRoute()
    isPending.value = true
    const { data, pending } = await productsData(query)
    const { products, productsCount: count } = satisfiedProductsData(data)
    isPending.value = pending.value
    productsCount.value = count
    productsList.value = addLinkToProducts(products)
  }

  async function loadSingleProduct() {
    isSinglePending.value = true
    const { data, pending } = await productData()
    createProductModel(data)
    isSinglePending.value = pending.value
  }

  async function deleteOne() {
    const { deleteById } = useDeleteProduct()
    const product = selectedProduct.value
    if (!product) return
    const { id } = await deleteById(product.id)
    if (!id) return
    clearNuxtData()
    await loadProductsList()
  }

  function createProductModel(product: Ref<Maybe<IProduct>>) {
    if (product.value) {
      const productClone = deepCloneObject<IProduct>(product.value)
      productModel.value = { ...productModel.value, ...productClone, categoryId: product.value.category.id }
      if ('category' in productModel.value) delete productModel.value.category
    }
  }

  async function upsertOne(product: ProductModel) {
    isPending.value = true
    const router = useRouter()
    const { upsertProduct } = useCreateProducts()
    const requiredFields = ['title', 'slug', 'categoryId'] as const
    if (!requiredFields.every(key => key in product && product[key] !== '')) throw createError('Some of required fields are empty')
    const { error } = await upsertProduct(product)

    if (error && error.value) throw createError(error.value)
    router.go(-1)
    clearNuxtData()
    loadProductsList()
  }

  return {
    productsList,
    productsCount,
    selectedProduct,
    isPending,
    isSinglePending,
    loadProductsList,
    findById,
    loadSingleProduct,
    deleteOne,
    upsertOne,
    productModel,
  }
})

function satisfiedProductsData(data: Ref<IProductsData | null>) {
  if (!data.value) throw createError('Some error with products first fetch')
  return data.value
}
