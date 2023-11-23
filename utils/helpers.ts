export function removeEmptyKeys(obj: object) {
  const keys = Object.keys(obj) as (keyof typeof obj)[]
  keys.forEach(key => {
    ;(obj[key] && typeof obj[key] === 'object' && removeEmptyKeys(obj[key])) ||
      ((obj[key] == undefined || obj[key] == null || obj[key] == '') && delete obj[key])
  })
}

export function addLinkToCategories(categories: Maybe<ICategory[]> | null): Maybe<ICategory[]> {
  return categories?.map(addLinkToCategory)
}
export function addLinkToProducts(products: Maybe<IProduct[]>): Maybe<IProduct[]> {
  return products?.map(addLinkToProduct) || null
}

export function addLinkToProduct(product: IProduct): IProduct {
  return { ...product, link: `/catalog/products/${product.id}` }
}
export function addLinkToCategory(category: ICategory): ICategory {
  return { ...category, link: `/catalog/categories/${category.id}` }
}

export async function delay(ms: number = 0) {
  return new Promise(res => setTimeout(res, ms))
}

export function deepCloneObject<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}

export const isType = <Type>(thing: any): thing is Type => true

export function keysFromObject<T extends object>(obj: T) {
  return Object.getOwnPropertyNames(obj) as (keyof T)[]
}

export function deepClone<T, U = T extends Array<infer V> ? V : never>(obj: T): T {
  if (Array.isArray(obj)) return obj.map(item => deepClone(item)) as T & U[]
  ////
  else if (obj && typeof obj === 'object' && !(obj instanceof Date)) {
    const keys = Object.getOwnPropertyNames(obj) as (keyof object)[]
    return keys.reduce((acc, curr) => {
      const descriptor = Object.getOwnPropertyDescriptor(obj, curr)
      if (!descriptor) throw createError('DESCRIPTOR IS NOT DEFINED')
      Object.defineProperty(acc, curr, descriptor)
      acc[curr] = deepClone(obj[curr])
      return acc
    }, createObject(obj))
    ///
  } else return obj
}

const objectPrototype = (obj: object) => Object.getPrototypeOf(obj)
export const createObject = (obj: object) => objectPrototype(obj)

const numbers = '0123456789'
export function randomWord(length: number, isWhitespace: boolean = false) {
  let result = ''
  const characters = !isWhitespace
    ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    : ' ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz ' + numbers

  let counter = 0
  while (counter < length) {
    result += randomItem(characters)
    counter += 1
  }
  return result
}

function randomItem(array: any[] | string): string {
  return typeof array === 'string'
    ? array.charAt(Math.floor(Math.random() * array.length))
    : array[Math.floor(Math.random() * array.length)]
}

export function randomPhoneNumber() {
  let phone = '8(9'
  phone += randomItem(numbers)
  phone += randomItem(numbers)
  phone += ')'

  for (let i = 0; i < 7; i++) {
    phone += randomItem(numbers)
    if (i == 2 || i == 4) phone += '-'
  }
  return phone
}

export function randomEmail() {
  const word = randomWord(6)
  return `${word}@mail.ru`
}

export function chooseRandomName() {
  const names = [
    'Александр',
    'Михаил',
    'Максим',
    'Лев',
    'Артем',
    'Марк',
    'Матвей',
    'Иван',
    'Даниил',
    'Дмитрий',
    'Тимофей',
    'Мирон',
    'Роман',
    'Мухаммад',
    'Кирилл',
    'Илья',
    'Егор',
    'Константин',
    'Андрей',
    'Алексей',
    'Федор',
    'Арсений',
    'Владимир',
    'Тимур',
    'Никита',
  ]

  const sirNames = [
    'Аврорин',
    'Аверин',
    'Агатов',
    'Адмиралов',
    'Александров',
    'Амурский',
    'Ангельский',
    'Анненский',
    'Апраскин',
    'Арбатов',
    'Аренский',
    'Арский',
    'Аристов',
    'Арбенин',
    'Арский',
    'Астров',
    'Ахматов',
    'Афинский',
    'Багиров',
    'Барон',
    'Бакурин',
    'Бартелеманов',
    'Балановский',
    'Белинский',
    'Белоградский',
    'Бельский',
    'Березов',
    'Беркутов',
    'Бестужев',
    'Богословский',
    'Богатырев',
    'Болконский',
    'Борисоглебский',
    'Булгаков',
    'Вавилов',
    'Ваганков',
    'Васнецов',
    'Валевский',
    'Варламов',
    'Варшавский',
    'Вельтистов',
    'Величанский',
    'Вепрев',
    'Вердеревский',
    'Верещагин',
    'Венидиктов',
    'Вертинский',
    'Верховский',
    'Ветров',
    'Вертоградский',
    'Виноградов',
    'Византийский',
    'Виленский',
    'Владимирский',
    'Воскресенский',
    'Воскобойников',
    'Воронов',
    'Вревский',
    'Всеволожский',
    'Вьюгин',
    'Гаранин',
    'Гедианов',
    'Гиляровский',
    'Глаголев',
    'Глинский',
    'Глебов',
    'Глинка',
    'Гмарь',
    'Гончаров',
    'Градов',
    'Гранин',
    'Граф',
    'Грацианский',
    'Грацианов',
    'Гронский',
    'Данилевский',
    'Данилов',
    'Долинин',
    'Доманский',
    'Донской',
    'Дмитриев',
    'Езерский',
    'Жемчугов',
    'Златогорский',
    'Златопольский',
    'Златоумов',
    'Илларионов',
    'Книжник',
    'Ковалевский',
    'Король',
    'Крымский',
    'Ладомирский',
    'Лазарев',
    'Ланской',
    'Ларин',
    'Лебединский',
    'Левин',
    'Литвинов',
    'Лозинский',
    'Льдов',
    'Малиновский',
    'Медведев',
    'Метельский',
    'Мещерский',
    'Михайловский',
    'Новгородский',
    'Новодворский',
    'Облонский',
    'Оболенский',
    'Огинский',
    'Огнецвет',
    'Одоевский',
    'Озеров',
    'Олейник',
    'Орлан',
    'Орловский',
    'Островский',
    'Парижский',
    'Печерский',
    'Покровский',
    'Полонский',
    'Преображенский',
    'Радов',
    'Райский',
    'Ржевский',
    'Родионов',
    'Розин',
    'Романовский',
    'Савранский',
    'Свиридов',
    'Северский',
    'Северянин',
    'Сибирский',
    'Славинский',
    'Смирнов',
    'Соболев',
    'Соколовский',
    'Соллертинский',
    'Спасский',
    'Сперанский',
    'Сталь',
    'Таран',
    'Тарасов',
    'Троицкий',
    'Трубецкой',
    'Уваров',
    'Уманский',
    'Филатов',
    'Фирсов',
    'Флоринский',
    'Хмелевский',
    'Чернышевский',
    'Чесменский',
    'Шахов',
    'Шереметев',
    'Шестинский',
    'Эллинский',
    'Эльбрусский',
    'Эмин',
    'Юлианский',
    'Юматов',
    'Юрьев',
    'Ягужинский',
    'Ямпольский',
    'Яров',
    'Яропольский',
  ]
  const name = names[Math.floor(Math.random() * names.length)]
  const sirName = sirNames[Math.floor(Math.random() * sirNames.length)]
  const fullName = sirName + ' ' + name
  return { name, sirName, fullName }
}
