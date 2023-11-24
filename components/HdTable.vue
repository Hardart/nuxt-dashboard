<script setup lang="ts">
defineProps<{
  items: IProduct[] | ICategory[]
  isShowCount?: boolean
  heads?: string[]
  deleteHandler?: (item: IProduct) => void
}>()
const headers = ['Название продукта', 'Дата создания', 'Дата обновления', 'Удалить', 'Показать']
</script>

<template>
  <div class="">
    <table class="w-full" v-if="items.length">
      <TableHead :heads="headers" />
      <TableBodyProducts :items="items" @delete="deleteHandler" />
    </table>
  </div>
</template>
