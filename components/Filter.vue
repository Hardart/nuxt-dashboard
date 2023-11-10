<script lang="ts" setup>
import { useCategoriesStore } from '~/store/useCategoriesStore'
import { useFilterStore } from '~/store/useFilterStore'
const { search, categoryId, sortBy, orderBy } = storeToRefs(useFilterStore())
const { orderAsc, orderDesc, restoreDefaults } = useFilterStore()
const sortParams = [
  { id: 'updatedAt', title: 'Дате обновления' },
  { id: 'createdAt', title: 'Дате создания' },
  { id: 'title', title: 'По названию' },
  { id: 'isPublished', title: 'Опубликовано' },
]

const categories = useCategoriesStore().getCategoriesList
</script>

<template>
  <div class="flex my-3 space-x-4">
    <UiInput class="w-full" v-model.trim="search" label="Поиск по названию" placeholder="введите текст" icon="magnifying-glass" />
    <UiSelect class="min-w-[160px]" label="Категория" v-if="categories" :options="categories" v-model="categoryId" />
    <UiSelect class="min-w-[160px]" label="Сортировать по:" :options="sortParams" v-model="sortBy" :is-empty-value="false" />
    <div class="flex items-end space-x-1">
      <button
        class="flex bg-white p-2 rounded-lg shadow-md border text-slate-400 active:shadow-sm"
        :class="orderBy == 1 && 'text-black'"
        @click="orderAsc"
      >
        <Icon name="heroicons:arrow-down" size="20" />
      </button>
      <button
        class="flex bg-white p-2 rounded-lg shadow-md border text-slate-400 active:shadow-sm"
        :class="orderBy !== 1 && 'text-black'"
        @click="orderDesc"
      >
        <Icon name="heroicons:arrow-up" size="20" />
      </button>
    </div>
    <div class="flex items-end space-x-1">
      <button
        class="flex bg-white p-2 rounded-lg shadow-md border text-slate-400 active:shadow-sm"
        :class="orderBy == 1 && 'text-black'"
        @click="restoreDefaults"
      >
        <Icon name="heroicons:arrow-path" size="20" />
      </button>
    </div>
  </div>
</template>
