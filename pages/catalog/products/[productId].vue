<script setup lang="ts">
import { useProductsStore } from '~/store/useProductsStore'
const { loadSingleProduct, createOrUpdate, loadProductsList } = useProductsStore()
const route = useRoute()
const { productModel: product } = storeToRefs(useProductsStore())
const id = route.params?.productId
if (id && typeof id !== 'string') throw createError('slug param is not a STRING')

loadSingleProduct(id)
const onSubmit = async (product: ProductModel) => {
  const requiredFields = ['title', 'slug', 'categoryId'] as const
  if (!requiredFields.every(key => key in product && product[key] !== '0')) throw createError('Some of required fields are empty')
  const { status } = await createOrUpdate(product)
  if (status == 'fail') throw createError('Some error on create or update product')
  if (status == 'ok') {
    clearNuxtData()
    loadProductsList()
    useRouter().back()
  }
}
</script>
<template>
  <ProductForm v-if="product" v-model:product="product" @submit="onSubmit" />
</template>
