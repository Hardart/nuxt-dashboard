interface IFilterSettings {
  sort: object[]
  publish: object[]
  categories: object[]
}
interface IProductForm {
  types: object[]
  categories: object[]
}
interface IAppSettings {
  filter: IFilterSettings
  productForm: IProductForm
}
export const useMeta = () => {
  const getSidebar = async () => await useFetchWithCache<ISidebarItem[]>('/api/sidebar')
  const getAppSettings = async () => await useFetchWithCache<IAppSettings>('/api/settings')
  return { getSidebar, getAppSettings }
}
