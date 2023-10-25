import { StorageSerializers } from '@vueuse/core'

export default async <T>(url: string, query?: { [key: string]: string | string[] }) => {
  const serializer = StorageSerializers.object
  const key = query ? objKeysToSessionKey(url, query) : url
  const cached = useSessionStorage<T>(key, null, { serializer })

  if (!cached.value) {
    const { data, error } = await useFetch<T>(url, { query })
    if (error.value) throw createError({ ...error.value, message: `Не могу получить данные по адресу - ${url}` })
    cached.value = data.value as T
  }

  return cached
}

function objKeysToSessionKey(url: string, obj: { [key: string]: string | string[] }): string {
  const value = Object.values(obj).join('/')
  return `${url}/${value}`
}
