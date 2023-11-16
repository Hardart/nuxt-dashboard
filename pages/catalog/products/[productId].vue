<script setup lang="ts">
import { useProductsStore } from '~/store/useProductsStore'
const { singleProduct } = storeToRefs(useProductsStore())
const { params } = useRoute()

if (typeof params.productId !== 'string') throw createError('slug param is not a STRING')
useProductsStore().loadSingleProduct(params.productId)
</script>
<template>
  <ProductForm v-if="singleProduct" :product="singleProduct" />
</template>
