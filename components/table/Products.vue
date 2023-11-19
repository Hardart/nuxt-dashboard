<script setup lang="ts">
const props = defineProps<{
  items: IProduct[] | ICategory[]
  isShowCount?: boolean
  modelValue: Maybe<IProduct | ICategory>
}>()
const emits = defineEmits(['delete', 'update:modelValue'])
const headers = ['Название продукта', 'Дата создания', 'Дата обновления', 'Удалить', 'Показать']
const deleteAction = (item: IProduct | ICategory) => {
  emits('delete')
  emits('update:modelValue', item)
}
</script>

<template>
  <div>
    <table class="w-full" v-if="items && items.length == 10">
      <TableHead :heads="headers" />
      <tbody>
        <tr v-for="(item, index) in items">
          <td class="border border-slate-700 px-3 py-2 text-center text-sm">{{ index + 1 }}</td>
          <td class="border border-slate-700 px-3 py-2">
            <NuxtLink :to="item.link" class="underline">{{ item.title }}</NuxtLink>
          </td>
          <td class="border border-slate-700">
            <p class="text-center">{{ new Date(item?.createdAt || '').toLocaleDateString() }}</p>
          </td>
          <td class="border border-slate-700">
            <p class="text-center">{{ new Date(item.updatedAt || '').toLocaleDateString() }}</p>
          </td>
          <td class="border border-slate-700">
            <UiTableButton iconName="trash" color="NEGATIVE" @click="deleteAction(item)" />
          </td>
          <td class="border border-slate-700">
            <UiStatusIcon :status="item?.isPublished ? 'ACTIVE' : ''" class="mx-auto" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
