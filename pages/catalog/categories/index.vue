<script lang="ts" setup>
import { useCategoriesStore } from '~/store/useCategoriesStore'

const categories = useCategoriesStore().getCategoriesList
</script>

<template>
  <div class="p-10">
    <TableProducts v-if="categories" :items="categories" type="categories" />
  </div>
</template>

<style scoped></style>
