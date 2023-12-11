interface IQueryFilter {
  filter: object
  page: number
  limit: number
  sort: { [key: string]: string }
}

export default defineEventHandler(event => {
  const queryObj = getQuery(event)

  const params = Object.entries(queryObj).reduce((acc, [key, value]) => {
    if (key === 'sort' && typeof value == 'string') {
      acc['sort'] = sortQueryTransform(value)
      delete queryObj[key]
    } else if (key === 'limit' || key == 'page') {
      acc[key] = parseInt(value as string)
      delete queryObj[key]
    }
    return acc
  }, {} as IQueryFilter)

  params.filter = queryObj
  params.page = params.page ? params.page - 1 : 0
  if (!params.limit) params.limit = 5
  event.context.query = params
})

function sortQueryTransform(value: string) {
  const arr = value.split('_')
  return { [arr[0]]: arr[1] }
}
