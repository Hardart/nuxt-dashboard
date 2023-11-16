<script lang="ts" setup>
import { useCategoriesStore } from '~/store/useCategoriesStore'
const { selectedCategory, getFilteredCategoryList } = storeToRefs(useCategoriesStore())
</script>

<template>
  <div class="p-10">
    <Filter :show-categoires="false" />
    <TableProducts v-model="selectedCategory" v-if="getFilteredCategoryList" :items="getFilteredCategoryList" type="categories" />
  </div>
</template>

<style scoped></style>
