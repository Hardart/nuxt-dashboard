export {}

interface BaseItem {
  id: string
  title: string
  slug: string
  image?: string
  link: string
  createdAt: string
  updatedAt: string
  isPublished: boolean
}

interface IFeatures {
  height: { min: number | string; max: number | string }
  class: number | string
  price: number | string
  weight: number | string
}

type Entries<T> = {
  [K in keyof T]: [K, T[K]]
}[keyof T][]

declare global {
  type Maybe<T> = T | null | undefined
  type SortBy = 'createdAt' | 'updatedAt' | 'title' | 'isPublished'
  type ProductModel = Omit<IProduct, 'category' | 'link' | 'id' | 'createdAt' | 'updatedAt'> & { categoryId: string }
  type FormCategory = Omit<ICategory, 'link' | 'id' | 'createdAt' | 'updatedAt'>

  interface IProduct extends BaseItem {
    subtitle?: string
    description: string
    price?: number | string
    type?: string
    category: ICategory
    features: IFeatures
  }

  interface ICategory extends BaseItem {
    products?: IProduct[]
  }

  interface IMetaItem extends BaseItem {
    childrens?: IMetaItem[]
  }

  interface ISidebarItem {
    title: string
    icon?: string
    childrens?: SidebarItem[]
    to?: string
    slug: string
  }

  interface IProductsData {
    products: IProduct[]
    productsCount: number
  }

  interface ObjectConstructor {
    entries<T extends object>(o: T): Entries<T>
  }
}
