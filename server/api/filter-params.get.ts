export default defineEventHandler(async event => {
  //
  const categoriesList: object[] = await $fetch('/api/categories')
  const categories = [{ id: '', title: 'Не выбрано' }, ...categoriesList]
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
  const publish = [
    { id: '', title: 'Не выбрано' },
    { id: '1', title: 'Опубликовано' },
    { id: '0', title: 'Не опубликовано' },
  ]
  const defaults = {
    categoryId: '',
    isPublished: '',
    limit: '10',
    sort: 'createdAt_desc',
  }

  return {
    sort,
    publish,
    categories,
    limit,
    defaults,
  }
})
