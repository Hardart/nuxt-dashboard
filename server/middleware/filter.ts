import { SortOrder } from 'mongoose'

export default defineEventHandler(event => {
  const queryObj = getQuery(event) as FilterQuery

  const params = Object.entries(queryObj).reduce((acc, [key, value]) => {
    if (key === 'sort' && typeof value == 'string') {
      acc['sort'] = sortQueryTransform(value)
      delete queryObj[key]
    } else if (key === 'limit' || key == 'page') {
      acc[key] = parseInt(value)
      delete queryObj[key]
    }
    return acc
  }, {} as IFilterQueryParams)

  params.filter = queryObj
  params.page = params.page ? params.page - 1 : 0
  if (!params.limit) params.limit = 10
  event.context.query = params
})

function sortQueryTransform(value: string): SortQuery {
  const arr = value.split('_')
  return { [arr[0]]: arr[1] }
}
