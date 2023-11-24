const orderKeys = ['asc', 'desc'] as const
type FilterItem<T> = { id: T; title: string }
interface ISortKeys {
  title: string
  createdAt: string
  updatedAt: string
}
interface IFilterKeys {
  categoryId: string
  isPublished: string
  sort: string
  limit: string
}

interface IFilterSettings {
  sort: { id: SortKey; title: string }[]
  categories: FilterItem<string>[]
  publish: { id: string; title: string }[]
  limit: { id: string; title: string }[]
  defaults: IFilterKeys
}

export type FilterKey = keyof IFilterKeys
type OrderKey = (typeof orderKeys)[number]
type SortKey = keyof ISortKeys
type Sorting = [SortKey, OrderKey]
