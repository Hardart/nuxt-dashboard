<script lang="ts" setup>
import type { LocationQuery } from 'vue-router'
type SortOrder = 'asc' | 'desc'
const { getAppSettings } = useMeta()
const settings = await getAppSettings()
const { sort, publish, categories } = settings.value.filter
const route = useRoute()
const router = useRouter()
const sortBy = ref('createdAt')
const sortOrder = ref('desc')

if (route.query.sort && typeof route.query.sort === 'string') {
  const [value1, value2] = route.query.sort.split('_')
  sortBy.value = value1
  sortOrder.value = value2
}

const sortString = computed(() => `${sortBy.value}_${sortOrder.value}`)

const filter = reactive<LocationQuery>({
  isPublished: route.query.isPublished || '',
  categoryId: route.query.categoryId || '',
  sort: sortString.value,
})

watch([sortBy, sortOrder], () => {
  filter.sort = sortString.value
  filterAction()
})

const AscOrDesc = (order: SortOrder = 'asc') => {
  sortOrder.value = order
}

const cleanFilter = () => {
  const clone = { ...filter }
  const keys = keysFromObject<LocationQuery>(clone)

  function deleteEmptyKey(key: string) {
    if (key == 'sort' && clone[key] == 'createdAt_desc') delete clone[key]
    else if (clone[key] == '') delete clone[key]
  }

  keys.forEach(deleteEmptyKey)

  return clone
}

const restoreFilter = async () => {
  const keys = keysFromObject<LocationQuery>(filter)
  const restoreByKey = (key: string) => (filter[key] = '')

  keys.forEach(restoreByKey)
  sortBy.value = 'createdAt'
  sortOrder.value = 'desc'
  await router.push({ path: route.path })
}

const filterAction = async () => {
  const query = cleanFilter()
  await router.push({ path: route.path, query })
}
</script>

<template>
  <div class="flex items-end my-3 space-x-4 max-lg:hidden">
    <UiSelect
      class="min-w-[160px]"
      label="Публикация"
      v-if="publish"
      :options="publish"
      v-model="filter.isPublished"
      :is-empty-value="false"
      @update:model-value="filterAction"
    />
    <UiSelect
      class="min-w-[160px]"
      label="Категория"
      v-if="categories"
      :options="categories"
      v-model="filter.categoryId"
      :is-empty-value="false"
      @update:model-value="filterAction"
    />
    <UiSelect
      class="min-w-[160px]"
      label="Сортировать по:"
      :options="sort"
      v-model="sortBy"
      :is-empty-value="false"
      @update:model-value="filterAction"
    />
    <div class="flex items-end space-x-1">
      <UiFilterButton
        :icon="'arrow-down'"
        :class="sortOrder === 'asc' ? 'text-neutral-800' : 'text-neutral-400'"
        @click="AscOrDesc('asc')"
      />
      <UiFilterButton
        :icon="'arrow-up'"
        :class="sortOrder === 'desc' ? 'text-neutral-800' : 'text-neutral-400'"
        @click="AscOrDesc('desc')"
      />
    </div>
    <div class="flex items-end space-x-1">
      <UiFilterButton :icon="'arrow-path'" icon-class="group-active:rotate-180 rotate-0 transition-transform" @click="restoreFilter" />
    </div>
  </div>
</template>
