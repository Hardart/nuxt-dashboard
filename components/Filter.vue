<script lang="ts" setup>
import type { LocationQuery } from 'vue-router'
const filterKeys = ['categoryId', 'isPublished', 'sort', 'limit'] as const
type FilterKey = (typeof filterKeys)[number]
const { settings } = useMeta()
const { sortBy, sortOrder, sortString, AscOrDesc, defaults } = useFilter()
const { sort, publish, categories, limit } = settings.value!.filter

const route = useRoute()
const router = useRouter()

if (route.query.sort && typeof route.query.sort === 'string') {
  const [value1, value2] = route.query.sort.split('_')
  sortBy.value = value1
  sortOrder.value = value2
}

const filter = reactive({
  isPublished: route.query.isPublished || '',
  categoryId: route.query.categoryId || '',
  sort: sortString.value,
  limit: route.query.limit || defaults.value.limit,
})

watch([sortBy, sortOrder], () => {
  filter.sort = sortString.value
  filterAction()
})

const cleanFilter = () => {
  const clone = { ...filter }
  const keys = keysFromObject(clone)
  keys.forEach(deleteEmptyKey)

  function deleteEmptyKey(key: FilterKey) {
    if (key in defaults.value && clone[key] === defaults.value[key]) delete clone[key]
  }

  return clone
}

const restoreFilter = () => {
  const keys = keysFromObject(filter)
  const restoreByKey = (key: FilterKey) => (filter[key] = defaults.value[key])
  keys.forEach(restoreByKey)
  sortBy.value = 'createdAt'
  sortOrder.value = 'desc'

  router.push({ path: route.path })
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
    <UiSelect
      class="min-w-[160px]"
      label="Показывать по:"
      :options="limit"
      v-model="filter.limit"
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
