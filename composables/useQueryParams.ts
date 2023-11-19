export const useQueryParams = () => {
  const route = useRoute()
  const queryPage = () => {
    const page = +`${route.query.page}`
    return page && typeof page == 'number' ? page : 1
  }

  return { queryPage, route }
}
