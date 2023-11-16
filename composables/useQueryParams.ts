export const useQueryParams = () => {
  const route = useRoute()

  const queryPage = () => {
    const page = +`${route.query.page}`
    if (page && typeof page == 'number') return page
    else return 1
  }

  const getQueryParameter = (param: string) => `${route.query[param]}`
  return { queryPage, getQueryParameter }
}
