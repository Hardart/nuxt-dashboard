<script setup lang="ts">
import { useProductsStore } from '~/store/useProductsStore'
const { loadSingleProduct, upsertOne } = useProductsStore()

const { productModel: product, isSinglePending, isPending } = storeToRefs(useProductsStore())

loadSingleProduct()
</script>
<template>
  <h2 v-if="isSinglePending">Loading</h2>
  <ProductForm v-else v-model:product="product" :is-pending="isPending" @submit="upsertOne" />
</template>
