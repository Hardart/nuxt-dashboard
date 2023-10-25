import { getProductBySlug, getCategoryBySlug, getCategoriesWithProductsQuery, getProducts, getCategories } from '~/graphql/typeDefs/query'
import { useAsyncQuery } from '#imports'
import { addLink } from '~/utils/helpers'

interface CategoryBySlug {
  categoryBySlug: ICategory
}

interface QueryCategories {
  categories: ICategory[]
}

export default {
  async productBySlug(slug: string): Promise<IProduct> {
    const { data } = await useAsyncQuery<{ productBySlug: IProduct }>(getProductBySlug, { slug })
    return data.value.productBySlug
  },
  async categoryBySlug(slug: string): Promise<ICategory> {
    const { data } = await useAsyncQuery<CategoryBySlug>(getCategoryBySlug, { slug })
    const category = { ...data.value.categoryBySlug }
    const products = category.products as IProduct[]
    category.products = addLinkToProduct(products, category.slug)
    return category
  },
  async categoriesWithProducts(): Promise<ICategory[]> {
    const { data } = await useAsyncQuery<QueryCategories>(getCategoriesWithProductsQuery)
    const categories = data.value.categories.map(addLink('/products')) as ICategory[]
    return categories
  },
  async categoriesMeta(): Promise<ICategory[]> {
    const { data } = await useAsyncQuery<QueryCategories>(getCategories)
    return data.value.categories
  },
  async allProduct(): Promise<IProduct[]> {
    const { data } = await useAsyncQuery<{ products: IProduct[] }>(getProducts)
    return data.value.products
  },
}
