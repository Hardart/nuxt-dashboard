<script setup lang="ts">
import apiGet from '@api/get'
const prodSlug = useRoute().params.productSlug
if (typeof prodSlug !== 'string') throw createError('slug is not defined')
const product = await apiGet.productBySlug(prodSlug)
</script>
<template>
  <ProductForm :product="product" />
</template>
