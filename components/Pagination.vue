<script setup lang="ts">
import type { LocationQueryRaw } from 'vue-router'
const { queryPage, queryLimit, route } = useQueryParams()

const props = defineProps<{
  totalPages: number
  handler: () => Promise<void>
}>()

const page = ref(queryPage())
const limit = ref(queryLimit())

watch(
  () => route.fullPath,
  async () => {
    await props.handler()
    page.value = queryPage()
    limit.value = queryLimit()
  }
)

const pagesCount = computed(() => Math.ceil(props.totalPages / limit.value))

const prevPage = computed(() => (page.value > 1 ? page.value - 1 : 1))
const nextPage = computed(() => (page.value < pagesCount.value ? page.value + 1 : pagesCount.value))
const toPrev = () => ({ path: route.path, query: { ...route.query, page: prevPage.value } })
const toNext = () => ({ path: route.path, query: { ...route.query, page: nextPage.value } })

const updateCurrentPage = (value: number) => (page.value = value)

const firstPageQuery = computed(() => queryParamsWithoutPage(route.query))

function queryParamsWithoutPage(obj: object): LocationQueryRaw {
  const objClone = { ...obj }
  if ('page' in objClone) delete objClone.page
  return objClone
}
</script>
<template>
  <div v-if="pagesCount > 1">
    <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
      <NuxtLink custom v-slot="{ navigate }" :to="toPrev()" v-if="page !== 1">
        <a class="pagination__arrow rounded-l-md cursor-pointer" @click="navigate">
          <span class="sr-only">Previous</span>
          <Icon name="heroicons:chevron-left" class="h-5 w-5" aria-hidden="true" />
        </a>
      </NuxtLink>
      <NuxtLink custom v-if="page === 1">
        <a class="pagination__arrow rounded-l-md">
          <span class="sr-only">Previous</span>
          <Icon name="heroicons:chevron-left" class="h-5 w-5" aria-hidden="true" />
        </a>
      </NuxtLink>

      <NuxtLink
        :to="{ path: route.path, query: firstPageQuery }"
        @click="updateCurrentPage(+$event.target.innerText)"
        :class="page == 1 ? 'pagination__item--active cursor-default' : 'pagination__item'"
        >1</NuxtLink
      >
      <NuxtLink class="pagination__dots" v-if="page >= 4">...</NuxtLink>

      <NuxtLink :to="toPrev()" @click="updateCurrentPage(+$event.target.innerText)" v-if="page >= 3" class="pagination__item">{{
        page - 1
      }}</NuxtLink>

      <NuxtLink class="pagination__item--active" v-if="page !== 1">{{ page }}</NuxtLink>

      <NuxtLink
        :to="toNext()"
        @click="updateCurrentPage(+$event.target.innerText)"
        v-if="page <= pagesCount - 2"
        class="pagination__item"
        >{{ page + 1 }}</NuxtLink
      >

      <NuxtLink class="pagination__dots" v-if="page <= pagesCount - 3">...</NuxtLink>

      <NuxtLink
        :to="{ path: route.path, query: { ...route.query, page: pagesCount } }"
        @click="updateCurrentPage(+$event.target.innerText)"
        v-if="page !== pagesCount"
        class="pagination__item"
        >{{ pagesCount }}</NuxtLink
      >

      <NuxtLink custom v-slot="{ navigate }" :to="toNext()" v-if="page !== pagesCount">
        <a class="pagination__arrow rounded-r-md cursor-pointer" @click="navigate">
          <span class="sr-only">Next</span>
          <Icon name="heroicons:chevron-right" class="h-5 w-5" aria-hidden="true" />
        </a>
      </NuxtLink>
    </nav>
  </div>
</template>
