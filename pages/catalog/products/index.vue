<script lang="ts" setup>
import { useProductsStore } from '@/store/useProductsStore'
import { useModal } from '~/composables/useModal'

const { loadProductsList, deleteOne } = useProductsStore()
const { productsCount, selectedProduct, productsList } = storeToRefs(useProductsStore())
const { isOpen, toggleOpen } = useModal()

loadProductsList()
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="pt-5 px-10">
      <div class="flex items-center">
        <NuxtLink to="/catalog/products/add" class="p-[7px] text-white bg-emerald-500 flex rounded-full my-1.5">
          <Icon :name="`heroicons:plus`" size="22" />
        </NuxtLink>

        <div class="ml-auto text-sm">Всего продуктов - {{ productsCount }}</div>
      </div>
      <Filter />
    </div>

    <div class="flex-grow relative">
      <div class="overflow-y-auto absolute inset-0 px-10 pb-3">
        <TableProducts v-model="selectedProduct" @delete="toggleOpen" v-if="productsList" :items="productsList" type="products" />
        <div class="flex justify-between">
          <Pagination :total-pages="productsCount" :on-page-change-handler="loadProductsList" />
          <ShowBy />
        </div>
      </div>
    </div>
    <ModalsConfirm :is-open="isOpen" :toggle-state="toggleOpen" :confirm-handler="deleteOne" />
  </div>
</template>

<style scoped></style>
