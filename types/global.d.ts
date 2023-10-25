export {}
interface BaseItem {
  id?: string
  title: string
  slug: string
  image?: string
  link: string
  createdAt?: string
}

interface IFeatures {
  height: { min: number; max: number }
  class: number
  price: number
  weight: number
}

declare global {
  type Maybe<T> = T | null | undefined

  interface IProduct extends BaseItem {
    subtitle?: string
    description: string
    price?: number
    type?: string
    category: ICategory
    features: IFeatures
  }

  interface ICategory extends BaseItem {
    products: (IProduct | ICategory)[]
  }

  interface IQueryData {
    categories: ICategory[]
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
}
