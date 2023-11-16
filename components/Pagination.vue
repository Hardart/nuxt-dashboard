<script setup lang="ts">
const props = defineProps<{
  totalPages: number
  modelValue: number
  loadHandler: () => void
}>()
const emits = defineEmits(['update:modelValue'])
const prevPage = computed(() => (props.modelValue > 1 ? props.modelValue - 1 : 1))
const nextPage = computed(() => (props.modelValue < props.totalPages ? props.modelValue + 1 : props.totalPages))

const onPrev = () => {
  emits('update:modelValue', prevPage.value)
  props.loadHandler()
}
const onNext = () => {
  emits('update:modelValue', nextPage.value)
  props.loadHandler()
}

const updateCurrentPage = (value: number) => {
  emits('update:modelValue', value)
  props.loadHandler()
}
</script>
<template>
  <div class="my-4" v-if="totalPages > 1">
    <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
      <NuxtLink :to="`?page=${prevPage}`" @click="onPrev" class="pagination__arrow">
        <span class="sr-only">Previous</span>
        <Icon name="heroicons:chevron-left" class="h-5 w-5" aria-hidden="true" />
      </NuxtLink>

      <NuxtLink :to="`?page=1`" @click="updateCurrentPage(+$event.target.innerText)" v-if="modelValue !== 1" class="pagination__item"
        >1</NuxtLink
      >
      <NuxtLink class="pagination__dots" v-if="modelValue >= 4">...</NuxtLink>

      <NuxtLink
        :to="`?page=${prevPage}`"
        @click="updateCurrentPage(+$event.target.innerText)"
        v-if="modelValue >= 3"
        class="pagination__item"
        >{{ prevPage }}</NuxtLink
      >

      <NuxtLink class="pagination__item--active">{{ modelValue }}</NuxtLink>

      <NuxtLink
        :to="`?page=${nextPage}`"
        @click="updateCurrentPage(+$event.target.innerText)"
        v-if="modelValue <= totalPages - 2"
        class="pagination__item"
        >{{ nextPage }}</NuxtLink
      >

      <NuxtLink class="pagination__dots" v-if="modelValue <= totalPages - 3">...</NuxtLink>

      <NuxtLink
        :to="`?page=${totalPages}`"
        @click="updateCurrentPage(+$event.target.innerText)"
        v-if="modelValue !== totalPages"
        class="pagination__item"
        >{{ totalPages }}</NuxtLink
      >

      <NuxtLink :to="`?page=${nextPage}`" @click="onNext" class="pagination__arrow">
        <span class="sr-only">Next</span>
        <Icon name="heroicons:chevron-right" class="h-5 w-5" aria-hidden="true" />
      </NuxtLink>
    </nav>
  </div>
</template>
