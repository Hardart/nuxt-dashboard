<script setup lang="ts">
import { useProductsStore } from '~/store/useProductsStore'

const { loadSingleProduct, loadProductsList } = useProductsStore()
const { upsertProduct } = useCreateProducts()
const { productModel: product } = storeToRefs(useProductsStore())

loadSingleProduct()
const onSubmit = async (product: ProductModel) => {
  const requiredFields = ['title', 'slug', 'categoryId'] as const
  if (!requiredFields.every(key => key in product && product[key] !== '')) throw createError('Some of required fields are empty')
  const { error } = await upsertProduct(product)

  if (error && error.value) throw createError(error.value)
  clearNuxtData()
  await loadProductsList()
  useRouter().back()
}
</script>
<template>
  <ProductForm v-model:product="product" @submit="onSubmit" />
</template>
