export const useQueryParams = () => {
  const route = useRoute()

  const queryPage = () => {
    const page = +`${route.query.page}`
    return page && typeof page == 'number' ? page : 1
  }

  const queryLimit = () => {
    const defaultLimit = useState<string>('defaultLimit').value
    const limit = +`${route.query.limit}`
    return limit && typeof limit == 'number' ? limit : parseInt(defaultLimit)
  }

  return { queryPage, queryLimit, route }
}
