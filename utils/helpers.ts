export function removeEmptyKeys(obj: object) {
  const keys = Object.keys(obj) as (keyof typeof obj)[]
  keys.forEach(key => {
    ;(obj[key] && typeof obj[key] === 'object' && removeEmptyKeys(obj[key])) ||
      ((obj[key] == undefined || obj[key] == null || obj[key] == '') && delete obj[key])
  })
}

export function addLinkToCategories(categories: Maybe<ICategory[]> | null): Maybe<ICategory[]> {
  return categories?.map(addLinkToCategory)
}
export function addLinkToProducts(products: Maybe<IProduct[]>): Maybe<IProduct[]> {
  return products?.map(addLinkToProduct) || null
}

export function addLinkToProduct(product: IProduct): IProduct {
  return { ...product, link: `/catalog/products/${product.id}` }
}
export function addLinkToCategory(category: ICategory): ICategory {
  return { ...category, link: `/catalog/categories/${category.id}` }
}

export async function delay(ms: number) {
  return new Promise(res => setTimeout(res, ms))
}

export function deepCloneObject<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}

export const isType = <Type>(thing: any): thing is Type => true

export function keysFromObject<T extends object>(obj: T) {
  return Object.keys(obj) as (keyof typeof obj)[]
}
