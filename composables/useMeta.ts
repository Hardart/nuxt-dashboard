type FiterItem = { id: string; title: string }
interface IFilterSettings {
  sort: FiterItem[]
  publish: FiterItem[]
  categories: FiterItem[]
  limit: FiterItem[]
}
interface IProductForm {
  types: object[]
  categories: object[]
}
interface IAppSettings {
  filter: IFilterSettings
  productForm: IProductForm
}
const initSettings = ref(false)

let settings = ref<IAppSettings>()

export const useMeta = () => {
  const getSidebar = async () => await useFetchWithCache<ISidebarItem[]>('/api/sidebar')

  const getAppSettings = async () => {
    if (initSettings.value) return
    const data = await useFetchWithCache<IAppSettings>('/api/settings')
    settings.value = data.value
    initSettings.value = true
  }
  return { getSidebar, getAppSettings, settings }
}
