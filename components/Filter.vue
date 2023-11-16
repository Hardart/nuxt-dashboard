<script lang="ts" setup>
import { useCategoriesStore } from '~/store/useCategoriesStore'

const { categoryList } = storeToRefs(useCategoriesStore())
const categoryParams = computed(() =>
  categoryList && categoryList.value ? [{ id: '', title: 'Не выбрано' }, ...categoryList.value] : null
)

const sortParams = [
  { id: 'createdAt', title: 'Дате создания' },
  { id: 'updatedAt', title: 'Дате обновления' },
  { id: 'title', title: 'По названию' },
]
const isPublished = [
  { id: '', title: 'Не выбрано' },
  { id: '1', title: 'Опубликовано' },
  { id: '0', title: 'Не опубликовано' },
]

const emit = defineEmits(['filter'])

withDefaults(
  defineProps<{
    showSearch?: boolean
    showCategoires?: boolean
    showSorting?: boolean
  }>(),
  {
    showSearch: true,
    showCategoires: true,
    showSorting: true,
  }
)

const { filter, sortOrder, sortBy, restoreFilter, setSortParams } = useFilter()

const emitFilter = () => {
  setSortParams()
  emit('filter', filter)
}

const ASC = () => {
  sortOrder.value = 'asc'
  emitFilter()
}

const DESC = () => {
  sortOrder.value = 'desc'
  emitFilter()
}

const restoreHandler = () => {
  restoreFilter()
  emitFilter()
}
</script>

<template>
  <!-- <UiInput
    class="w-full"
    v-if="showSearch"
    label="Поиск по названию"
    placeholder="введите текст"
    icon="magnifying-glass"
    v-model.trim="filter.search"
  /> -->
  <div class="flex items-end my-3 space-x-4 max-lg:hidden">
    <UiSelect
      class="min-w-[160px]"
      label="Публикация"
      v-if="categoryParams"
      :options="isPublished"
      v-model="filter.isPublished"
      :is-empty-value="false"
      @update:model-value="emitFilter"
    />
    <UiSelect
      class="min-w-[160px]"
      label="Категория"
      v-if="categoryParams && showCategoires"
      :options="categoryParams"
      v-model="filter.categoryId"
      :is-empty-value="false"
      @update:model-value="emitFilter"
    />
    <UiSelect
      class="min-w-[160px]"
      label="Сортировать по:"
      v-if="showSorting"
      :options="sortParams"
      v-model="sortBy"
      :is-empty-value="false"
      @update:model-value="emitFilter"
    />
    <div class="flex items-end space-x-1" v-if="showCategoires || showSearch || showSorting">
      <UiFilterButton :icon="'arrow-down'" :class="sortOrder === 'asc' ? 'text-neutral-800' : 'text-neutral-400'" @click="ASC" />
      <UiFilterButton :icon="'arrow-up'" :class="sortOrder === 'desc' ? 'text-neutral-800' : 'text-neutral-400'" @click="DESC" />
    </div>
    <div class="flex items-end space-x-1" v-if="showCategoires || showSearch || showSorting">
      <UiFilterButton :icon="'arrow-path'" icon-class="group-active:rotate-180 rotate-0 transition-transform" @click="restoreHandler" />
    </div>
  </div>
</template>
