export function removeEmptyKeys(obj: object) {
  const keys = Object.keys(obj) as (keyof typeof obj)[]
  keys.forEach(key => {
    ;(obj[key] && typeof obj[key] === 'object' && removeEmptyKeys(obj[key])) ||
      ((obj[key] == undefined || obj[key] == null || obj[key] == '') && delete obj[key])
  })
}

export function addLinkToCategory(categories: ICategory[] | null): ICategory[] | null {
  return categories?.map(cat => ({ ...cat, link: `/catalog/categories/${cat.id}` })) || null
}
export function addLinkToProduct(products: IProduct[] | null): IProduct[] | null {
  return products?.map(p => ({ ...p, link: `/catalog/products/${p.id}` })) || null
}

export async function delay(ms: number) {
  return new Promise(res => setTimeout(res, ms))
}

export function deepCloneObject<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}
