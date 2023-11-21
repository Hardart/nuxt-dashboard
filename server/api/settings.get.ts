export default defineEventHandler(async event => {
  //
  const categories: object[] = await $fetch('/api/categories')
  const sort = [
    { id: 'createdAt', title: 'Дате создания' },
    { id: 'updatedAt', title: 'Дате обновления' },
    { id: 'title', title: 'По названию' },
  ]
  const publish = [
    { id: '', title: 'Не выбрано' },
    { id: '1', title: 'Опубликовано' },
    { id: '0', title: 'Не опубликовано' },
  ]
  const types = [
    { id: '', title: 'Не выбрано' },
    { id: 'OKS', title: 'ОКС' },
    { id: 'ZKS', title: 'ЗКС' },
  ]
  const settings = {
    filter: {
      sort,
      publish,
      categories: [{ id: '', title: 'Не выбрано' }, ...categories],
    },

    productForm: {
      types,
      categories,
    },
  }
  return settings
})
