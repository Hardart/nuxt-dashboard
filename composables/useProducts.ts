export const useProducts = () => {
  const products = useFetch<IProduct[]>('/api/products')
  return { products }
}
