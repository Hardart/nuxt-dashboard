<script lang="ts" setup>
import type { FilterKey, IFilterSettings, IFilterKeys, Sorting, OrderKey } from '@/types/filter'
const route = useRoute()
const router = useRouter()
const { publish, categories, sort, defaults } = useState<IFilterSettings>('filterParams').value

const filter = ref<IFilterKeys>({ ...defaults })
const splitSortDefault = () => defaults.sort.split('_') as Sorting
const sorting = ref<Sorting>(splitSortDefault())

Object.entries(route.query).forEach(([key, value]) => {
  if (isType<FilterKey>(key)) filter.value[key] = value as string
})
if (route.query.sort && typeof route.query.sort === 'string') {
  const [sortValue, orderValue] = route.query.sort.split('_') as Sorting
  sorting.value[0] = sortValue
  sorting.value[1] = orderValue
}

const restoreFilter = () => {
  filter.value = { ...defaults }
  sorting.value = splitSortDefault()
}

const setOrder = (orderValue: OrderKey) => (sorting.value[1] = orderValue)
const orderIs = (orderValue: OrderKey) => sorting.value[1] == orderValue

watch(
  sorting,
  () => {
    const [sortValue, orderValue] = sorting.value
    filter.value.sort = `${sortValue}_${orderValue}`
  },
  { deep: true }
)
watch(
  () => route.query.limit,
  () => (filter.value.limit = route.query.limit as string)
)
watch(
  filter,
  () => {
    const query = Object.entries(filter.value).reduce((acc, [key, value]) => {
      if (defaults[key] !== filter.value[key]) acc[key] = value
      return acc
    }, {} as typeof filter.value)
    if ('page' in query) delete query['page']
    router.push({ path: route.path, query })
  },
  { deep: true }
)
</script>

<template>
  <div class="flex justify-end items-end my-3 space-x-3 max-lg:hidden">
    <UiSelect class="min-w-[160px]" label="Публикация" :options="publish" v-model="filter.isPublished" />
    <UiSelect class="min-w-[160px]" label="Категория" :options="categories" v-model="filter.categoryId" />
    <UiSelect class="min-w-[160px]" label="Сортировать по:" :options="sort" v-model="sorting[0]" />
    <div class="flex items-center space-x-1 mb-0.5">
      <UiFilterButton :icon="'arrow-down'" size="15" class="py-2 px-0.5" :active="orderIs('asc')" @click="setOrder('asc')" />
      <UiFilterButton :icon="'arrow-up'" size="15" class="py-2 px-0.5" :active="orderIs('desc')" @click="setOrder('desc')" />
    </div>
    <div class="flex items-center space-x-1">
      <UiFilterButton
        :icon="'arrow-path'"
        class="p-2 mb-0.5"
        size="15"
        :active="true"
        icon-class="group-active:rotate-180 rotate-0 transition-transform"
        @click="restoreFilter"
      />
    </div>
  </div>
</template>
