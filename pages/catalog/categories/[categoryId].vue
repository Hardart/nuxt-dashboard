<script setup lang="ts">
import { useCategoriesStore } from '~/store/useCategoriesStore'
import { useProductsStore } from '~/store/useProductsStore'

const { categorySlug } = useRoute().params
if (typeof categorySlug !== 'string') throw createError('slug param is not a STRING')

const { getCategory } = useCategoriesStore()
const { getProductsList } = storeToRefs(useProductsStore())
const category = getCategory(categorySlug)
const products = getProductsList
</script>
<template>
  <div class="p-5">
    <div class="mb-20 flex items-center justify-between">
      <h3 class="text-3xl font-semibold">Категория - {{ category?.title }}</h3>
      <NuxtLink
        to="/products/categories/add"
        class="p-3 text-3xl text-white bg-green-700 flex rounded-full"
      >
        <Icon name="heroicons:plus" />
      </NuxtLink>
    </div>
    <TableProducts v-if="products" :items="products" />
    <h4 v-else>В этой категории нет продуктов</h4>
  </div>
</template>
