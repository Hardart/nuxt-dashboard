<script setup lang="ts">
const props = defineProps<{
  items: IProduct[] | ICategory[]

  isShowCount?: boolean
}>()
defineEmits(['delete'])
const headers = ['Название продукта', 'Дата создания', 'Дата обновления', 'Удалить', 'Показать']
const change = (link: string | undefined) => {
  if (!link) return
  useRouter().push(link)
}
</script>

<template>
  <table class="w-full" v-if="items">
    <TableHead :heads="headers" />
    <tbody>
      <tr v-for="(item, index) in items">
        <td class="border border-slate-700 px-3 py-2 text-sm">{{ index + 1 }}</td>
        <td class="border border-slate-700 px-3 py-2">
          <NuxtLink :to="item.link" class="underline">{{ item.title }}</NuxtLink>
        </td>
        <td class="border border-slate-700">
          <!-- <UiTableButton iconName="pencil-square" color="POSITIVE" @click="change(item.link)" /> -->
          <p class="text-center">{{ new Date(item.createdAt).toLocaleDateString() }}</p>
        </td>
        <td class="border border-slate-700">
          <!-- <UiTableButton iconName="pencil-square" color="POSITIVE" @click="change(item.link)" /> -->
          <p class="text-center">{{ new Date(item.updatedAt).toLocaleDateString() }}</p>
        </td>
        <td class="border border-slate-700">
          <UiTableButton iconName="trash" color="NEGATIVE" @click="$emit('delete', item.id)" />
        </td>
        <td class="border border-slate-700">
          <UiStatusIcon :status="item?.isPublished ? 'ACTIVE' : ''" class="mx-auto" />
        </td>
      </tr>
    </tbody>
  </table>
</template>
