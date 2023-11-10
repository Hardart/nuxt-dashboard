<script lang="ts" setup>
import { useProductsStore } from '@/store/useProductsStore'
const { loadProductsList, updateProductsList, deleteOne, getProductsList } = useProductsStore()
await loadProductsList()

const products = computed(() => getProductsList())
</script>

<template>
  <div class="p-10">
    <div class="inline-block">
      <NuxtLink to="/catalog/products/add" class="p-[7px] text-white bg-emerald-500 flex rounded-full my-1.5">
        <Icon :name="`heroicons:plus`" size="22" />
      </NuxtLink>
    </div>
    <div class="inline-block ml-2">
      <button @click="updateProductsList()" class="p-[7px] text-white bg-sky-500 flex rounded-full my-1.5">
        <Icon :name="`heroicons:arrow-path`" size="22" />
      </button>
    </div>
    <Filter />
    <TableProducts @delete="deleteOne" v-if="products" :items="products" type="products" />
  </div>
</template>

<style scoped></style>
