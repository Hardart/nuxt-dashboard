<script setup lang="ts">
import { useProductsStore } from '~/store/useProductsStore'
const { params } = useRoute()
const { productModel: product } = storeToRefs(useProductsStore())
if (typeof params.productId !== 'string') throw createError('slug param is not a STRING')

useProductsStore().loadSingleProduct(params.productId)
</script>
<template>
  <ProductForm v-if="product" v-model:product="product" />
</template>
