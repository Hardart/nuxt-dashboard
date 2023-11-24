<script lang="ts" setup>
import type { OrderKey, IFilterSettings, IFilterKeys } from '@/types/filter'
const route = useRoute()
const router = useRouter()
const { defaults, limit } = await $fetch<IFilterSettings>('/api/filter-params')

const showBy = ref(defaults.limit)

Object.entries(route.query).forEach(([key, value]) => {
  if (key == 'limit') showBy.value = value as string
})

watch(
  () => route.query,
  () => {
    if (!Object.keys(route.query).length) showBy.value = defaults.limit
  }
)

watch([showBy], () => {
  const query = { ...route.query }
  delete query['page']
  if (showBy.value === defaults.limit) delete query['limit']
  else query.limit = showBy.value
  router.push({ path: route.path, query })
})
</script>

<template>
  <div class="flex ml-auto space-x-2 max-lg:hidden">
    <UiSelect class="flex items-center gap-1 whitespace-nowrap" positon="top" label="Показывать по:" :options="limit" v-model="showBy" />
  </div>
</template>
