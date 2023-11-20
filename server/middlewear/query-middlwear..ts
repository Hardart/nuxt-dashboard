import { Response, NextFunction } from 'express'
import { SortOrder } from 'mongoose'

const filterKeys = ['categoryId', 'isPublished']

export function setFilter(req: CustomRequest, res: Response, next: NextFunction) {
  const queryObject = req.query as object

  const params = Object.entries(queryObject).reduce((acc, [key, value]) => {
    if (key == 'sort') acc['sort'] = value.split('_').reduce((acc: string, curr: SortOrder) => ({ [acc]: curr }))
    if (key == 'page') acc['page'] = parseInt(value)
    if (key == 'limit') acc['limit'] = parseInt(value)
    if (typeof acc['filter'] == 'undefined' || !Array.isArray(acc['filter'])) acc['filter'] = []
    if (filterKeys.includes(key)) acc['filter'].push({ [key]: value })
    return acc
  }, {} as IFilterQueryParams)

  if (!params.filter?.length) params.filter = [{}]
  params.page = params.page ? params.page - 1 : 0
  if (!params.limit) params.limit = 10
  if (!params.sort) params.sort = { createdAt: 'desc' }

  req.filterParams = params
  next()
}
