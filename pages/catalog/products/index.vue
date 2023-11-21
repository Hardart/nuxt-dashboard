<script lang="ts" setup>
import { useProductsStore } from '@/store/useProductsStore'
import { useModal } from '~/composables/useModal'

const { deleteOneWithAction, loadProductsList } = useProductsStore()
const { productsCount, selectedProduct, productsList } = storeToRefs(useProductsStore())
const { isOpen, toggleOpen } = useModal()

const { queryPage, route } = useQueryParams()
loadProductsList()
const page = ref(queryPage())

watch(
  () => route.fullPath,
  async () => {
    await loadProductsList()
    page.value = queryPage()
  }
)
</script>

<template>
  <div class="p-10 flex flex-col h-full">
    <div class="flex items-center">
      <NuxtLink to="/catalog/products/add" class="p-[7px] text-white bg-emerald-500 flex rounded-full my-1.5">
        <Icon :name="`heroicons:plus`" size="22" />
      </NuxtLink>

      <div class="ml-auto text-sm">Всего продуктов - {{ productsCount }}</div>
    </div>
    <Filter />
    <TableProducts v-model="selectedProduct" @delete="toggleOpen" v-if="productsList" :items="productsList" type="products" />
    <Pagination :total-pages="productsCount" v-model:page="page" />
    <ModalsConfirm :is-open="isOpen" :toggle-state="toggleOpen" :confirm-handler="deleteOneWithAction(toggleOpen)" />
  </div>
</template>

<style scoped></style>
