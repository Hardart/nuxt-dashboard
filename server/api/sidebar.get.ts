export default defineEventHandler(event => {
  const catalogBaseURL = '/catalog'
  return [
    { title: 'Dashboard', icon: 'heroicons:home', slug: 'dashboard', to: '/' },
    {
      title: 'Покупатели',
      icon: 'heroicons:user-group',
      slug: 'customers',
    },
    {
      title: 'Заказы',
      icon: 'heroicons:shopping-cart',
      slug: 'orders',
      to: '/orders',
    },
    {
      title: 'Товары',
      icon: 'heroicons:cube',
      slug: 'catalog',
      childrens: [
        { title: 'Категории', to: `${catalogBaseURL}/categories`, slug: 'categories' },
        { title: 'Продукты', to: `${catalogBaseURL}/products`, slug: 'products' },
      ],
    },
    {
      title: 'Новости',
      icon: 'heroicons:newspaper',
      slug: 'news',
      childrens: [{ title: 'Список', to: '/news/list' }],
    },
  ]
})
