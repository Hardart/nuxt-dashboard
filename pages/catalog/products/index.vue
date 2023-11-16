<script lang="ts" setup>
import { useProductsStore } from '@/store/useProductsStore'
import { useModal } from '~/composables/useModal'
const { initProductsList, deleteOneWithAction, loadProductsListWithFilter } = useProductsStore()
const { productsCount, selectedProduct, productsList } = storeToRefs(useProductsStore())
const { isOpen, toggleOpen } = useModal()

await initProductsList()
</script>

<template>
  <div class="p-10 flex flex-col h-full">
    <div class="flex items-center">
      <NuxtLink to="/catalog/products/add" class="p-[7px] text-white bg-emerald-500 flex rounded-full my-1.5">
        <Icon :name="`heroicons:plus`" size="22" />
      </NuxtLink>

      <div class="ml-auto text-sm">Всего продуктов - {{ productsCount }}</div>
    </div>
    <Filter @filter="loadProductsListWithFilter" />
    <TableProducts v-model="selectedProduct" @delete="toggleOpen" v-if="productsList" :items="productsList" type="products" />
    <!-- <Pagination v-model="page" :load-handler="updateProductList" :total-pages="pagesCount" /> -->
    <ModalsConfirm :is-open="isOpen" :toggle-state="toggleOpen" :confirm-handler="deleteOneWithAction(toggleOpen)" />
  </div>
</template>

<style scoped></style>
