export default defineEventHandler(async event => {
  //
  const categoriesList: object[] = await $fetch('/api/categories')
  const notSelectedItem = { id: '', title: 'Не выбрано' }
  const categories = [{ id: '', title: 'Не выбрано' }, ...categoriesList]
  const types = [notSelectedItem, { id: 'OKS', title: 'ОКС' }, { id: 'ZKS', title: 'ЗКС' }]

  const filter = await $fetch('/api/filter-params')
  filter.categories = categories

  const settings = {
    productForm: {
      types,
      categories,
    },
    filter,
  }

  return settings
})
