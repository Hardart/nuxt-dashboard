<script lang="ts" setup>
import { useNewsStore } from '~/store/useNewsStore'
const { productsList: products, isPending } = storeToRefs(useNewsStore())
const { loadProductsList } = useNewsStore()
const route = useRoute()

loadProductsList()
watch(
  () => route.fullPath,
  () => loadProductsList()
)
</script>

<template>
  <ModalsPending :is-open="isPending" />
  <div v-for="product in products">{{ product.title }}: опубликовано - {{ product.isPublished }}</div>
  <NuxtLink :to="{ path: route.path, query: { isPublished: '0' } }">send query</NuxtLink>
  <NuxtPage />
</template>

<style scoped></style>
