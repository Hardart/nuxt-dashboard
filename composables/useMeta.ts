export const useMeta = async () => {
  const sidebar = await useFetchWithCache<ISidebarItem[]>('/api/sidebar')

  return { sidebar }
}
