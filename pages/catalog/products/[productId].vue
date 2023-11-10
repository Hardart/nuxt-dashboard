<script setup lang="ts">
import { useProductsStore } from '~/store/useProductsStore'
const { productId } = useRoute().params
if (typeof productId !== 'string') throw createError('slug param is not a STRING')
useProductsStore().loadSingleProduct(productId)
const product = useProductsStore().getSingleProduct
</script>
<template>
  <ProductForm v-if="product" :product="product" />
</template>
