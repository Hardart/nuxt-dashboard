interface IFilterSettings {
  sort: object[]
  publish: object[]
  categories: object[]
  types: object[]
}
export const useMeta = () => {
  const getSidebar = async () => await useFetchWithCache<ISidebarItem[]>('/api/sidebar')
  const getAppSettings = async () => await useFetchWithCache<IFilterSettings>('/api/settings')
  return { getSidebar, getAppSettings }
}
