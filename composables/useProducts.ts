export const useProducts = () => {
  const products = useFetchProducts()
  return { products }
}
