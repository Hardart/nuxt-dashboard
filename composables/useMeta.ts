import api from '@api/meta'
export const useMeta = async () => {
  const sidebar = await useFetchWithCache<ISidebarItem[]>('/api/sidebar')
  const metaData = async () => await api.meta()
  return { sidebar, metaData }
}
