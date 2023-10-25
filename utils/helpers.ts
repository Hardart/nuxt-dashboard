export function findBySlug(items: any[], searchSlug: string): IMetaItem {
  const findElement = (item: IMetaItem) => {
    if (!('slug' in item)) throw createError(`element has not key 'slug'`)
    if (item.slug === searchSlug) return item
  }

  const element = items.find(findElement)
  if (!element) throw createError(`Can't find element with slug ${searchSlug}`)
  return element
}

export function removeEmptyKeys(obj: object) {
  const keys = Object.keys(obj) as (keyof typeof obj)[]
  keys.forEach(key => {
    const value = obj[key]
    if (!value) delete obj[key]
    if (typeof value === 'object') removeEmptyKeys(value)
  })
}

export function addLink(baseLink: string): (item: IProduct | ICategory) => IProduct | ICategory {
  return function (item: IProduct | ICategory): IProduct | ICategory {
    const link = `${baseLink}/${item.slug}`
    const products = findChildrens(item, link)
    if (!products) return { ...item, link }
    return { ...item, link, ...(products && { products }) }
  }
}

function findChildrens(obj: unknown, link: string) {
  if (typeof obj !== 'object' || obj == null) return
  return Object.values(obj)
    .map(mapChildrens(link))
    .find(el => typeof el !== 'undefined')
}

function mapChildrens(link: string) {
  return (value: any) => {
    if (typeof value === 'object' && Array.isArray(value) && value.length && 'slug' in value[0]) return value.map(addLink(link))
  }
}

export function addLinkToProduct(products: IProduct[], categorySlug?: string): IProduct[] {
  return products.map(p => {
    const slug = p.category ? p.category.slug : categorySlug
    return { ...p, link: `/products/${slug}/${p.slug}` }
  })
}

export async function delay(ms: number) {
  return new Promise(res => setTimeout(res, ms))
}
