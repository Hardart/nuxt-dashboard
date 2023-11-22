export const useDeleteProduct = () => {
  const deleteById = async (id: string) => await $fetch<IProduct>('/api/products', { method: 'delete', body: { id } })
  return { deleteById }
}
