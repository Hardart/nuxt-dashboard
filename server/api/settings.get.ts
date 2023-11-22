export default defineEventHandler(async event => {
  //
  const categories: object[] = await $fetch('/api/categories')
  const notSelectedItem = { id: '', title: 'Не выбрано' }
  const sort = [
    { id: 'createdAt', title: 'Дате создания' },
    { id: 'updatedAt', title: 'Дате обновления' },
    { id: 'title', title: 'По названию' },
  ]
  const limit = [
    { id: '5', title: '5' },
    { id: '10', title: '10' },
    { id: '15', title: '15' },
    { id: '20', title: '20' },
  ]
  const publish = [notSelectedItem, { id: '1', title: 'Опубликовано' }, { id: '0', title: 'Не опубликовано' }]
  const types = [notSelectedItem, { id: 'OKS', title: 'ОКС' }, { id: 'ZKS', title: 'ЗКС' }]

  const settings = {
    filter: {
      sort,
      publish,
      categories: [notSelectedItem, ...categories],
      limit,
    },

    productForm: {
      types,
      categories,
    },
  }
  return settings
})
