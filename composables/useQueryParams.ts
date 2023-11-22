export const useQueryParams = () => {
  const route = useRoute()

  const queryPage = () => {
    const page = +`${route.query.page}`
    return page && typeof page == 'number' ? page : 1
  }

  const queryLimit = (defaultValue: string) => {
    const limit = +`${route.query.limit}`
    return limit && typeof limit == 'number' ? limit : parseInt(defaultValue)
  }

  return { queryPage, queryLimit, route }
}
