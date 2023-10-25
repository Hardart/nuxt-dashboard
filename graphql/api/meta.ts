import { getMeta } from '~/graphql/typeDefs/query'
import { useAsyncQuery } from '#imports'

export default {
  async meta(): Promise<IMetaItem[]> {
    const { data } = await useAsyncQuery<IQueryData>(getMeta)
    return data.value.categories.map(bundleMeta('/products'))
  },
}

function bundleMeta(baseLink: string): (item: IProduct | ICategory) => IMetaItem {
  return function (item: IProduct | ICategory): IMetaItem {
    const { slug, title } = item
    const link = `${baseLink}/${slug}`
    const childrens = findChildrens(item, link)
    return { title, slug, link, ...(childrens && { childrens }) }
  }
}

function findChildrens(obj: unknown, link: string) {
  if (typeof obj !== 'object' || obj == null) throw createError('Errror')
  return Object.values(obj)
    .map(mapChildrens(link))
    .find(el => typeof el !== 'undefined')
}

function mapChildrens(link: string) {
  return (value: any) => {
    if (typeof value === 'object' && Array.isArray(value) && value.length && 'slug' in value[0]) return value.map(bundleMeta(link))
  }
}
