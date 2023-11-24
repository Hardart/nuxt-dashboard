<script setup lang="ts">
defineProps<{
  items: IProduct[] | ICategory[]
}>()
const emit = defineEmits(['delete'])
const { queryPage, queryLimit } = useQueryParams()
const slice = computed(() => queryLimit() * (queryPage() - 1))
</script>

<template>
  <tbody>
    <tr v-for="(item, index) in items" class="max-lg:text-sm">
      <td class="border border-slate-700 px-3 py-2 text-center text-sm max-lg:hidden">{{ index + 1 + slice }}</td>
      <td class="border border-slate-700 px-3 py-2">
        <NuxtLink :to="item.link" class="underline">{{ item.title }}</NuxtLink>
      </td>
      <td class="border border-slate-700">
        <p class="text-center">{{ new Date(item.createdAt || '').toLocaleDateString() }}</p>
      </td>
      <td class="border border-slate-700">
        <p class="text-center">{{ new Date(item.updatedAt || '').toLocaleDateString() }}</p>
      </td>
      <td class="border border-slate-700">
        <UiTableButton iconName="trash" color="NEGATIVE" @click="emit('delete', item)" />
      </td>
      <td class="border border-slate-700">
        <UiStatusIcon :status="item?.isPublished ? 'ACTIVE' : ''" class="mx-auto" />
      </td>
    </tr>
  </tbody>
</template>
