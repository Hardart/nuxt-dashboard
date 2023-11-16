<script setup lang="ts">
import { useCategoriesStore } from '~/store/useCategoriesStore'
const { findById } = useCategoriesStore()
const { categoryId } = useRoute().params
if (typeof categoryId !== 'string') throw createError('ID param is not a STRING')

const category = computed(() => findById(categoryId))
</script>
<template>
  <CategoryForm v-if="category" :category="category" />
</template>
