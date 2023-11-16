export const usePaginaton = () => {
  const page = ref(1)
  const limit = ref(7)
  const itemsCount = ref(0)
  const initCurrentPage = () => (page.value = useQueryParams().queryPage())
  const pagesCount = computed(() => Math.ceil(itemsCount.value / limit.value))

  return { page, limit, itemsCount, initCurrentPage, pagesCount }
}
