<script setup lang="ts">
import { useCategoriesStore } from '~/store/useCategoriesStore'
import { useProductsStore } from '~/store/useProductsStore'
const props = defineProps<{
  product?: IProduct
}>()

useCategoriesStore().loadCategoriesList()

const categories = useCategoriesStore().getCategoriesList
const form: FormProduct = reactive(setForm(props.product))

function setForm(product?: IProduct) {
  let formTemplate: FormProduct = {
    title: '',
    categoryId: '0',
    subtitle: '',
    slug: '',
    price: '',
    description: '',
    type: '',
    image: '',
    isPublished: false,
    features: {
      class: '',
      price: '',
      weight: '',
      height: {
        min: '',
        max: '',
      },
    },
  }

  if (product && product?.category?.id) {
    const productClone = deepCloneObject<IProduct>(product)
    formTemplate = { ...formTemplate, ...productClone, categoryId: product.category.id }

    if ('category' in formTemplate) delete formTemplate.category
  }

  return formTemplate
}

const productTypes = [
  { id: 'OKS', title: 'ОКС' },
  { id: 'ZKS', title: 'ЗКС' },
]

const onSubmit = async () => {
  // removeEmptyKeys(form)
  const requiredFields = ['title', 'slug', 'categoryId'] as const

  const { status } = await useProductsStore().createOrUpdate(form)
  if (status == 'fail') throw createError('Some error on create or update product')
  if (status == 'ok') console.log('ok')

  // if (!requiredFields.every(key => key in o)) throw createError('Some of required fields are empty')
  // const { data } = await apiPost.createProductMutation(form)
  // if (data.createProduct)
  //   await useRouter().push(`/products/categories/${props.product?.category.slug}`)
}
</script>

<template>
  <Container class="py-7">
    <form class="space-y-10" @submit.prevent="onSubmit" ref="itemFormData">
      <div class="grid grid-cols-3 max-md:grid-cols-1 max-md:space-y-3 gap-x-5">
        <UiInput is-requried label="Название" placeholder="Берёза повислая" v-model="form.title" name="title" />
        <UiInput label="Подназвание" placeholder="Двухгодовалая" v-model="form.subtitle" name="subtitle" />
        <UiInput is-requried label="Slug" placeholder="bereza-povislaya" v-model="form.slug" name="slug" />
      </div>
      <div class="flex gap-x-2">
        <UiSelect v-if="categories" class="flex-1" :options="categories" label="Категория" v-model="form.categoryId" />
        <UiSelect class="flex-1" :options="productTypes" label="Тип" name="type" v-model="form.type" />
        <UiInput class="flex-[3]" label="Цена" placeholder="100" v-model.number="form.price" content-after="₽" name="price" />
      </div>
      <div class="grid md:grid-cols-2 md:gap-x-6 max-md:gap-y-5">
        <div>
          <h4 class="font-semibold mb-2">Особенности:</h4>
          <div class="grid grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-x-2">
            <UiInput label="Класс" placeholder="1" v-model.number="form.features.class" name="class" />
            <UiInput label="Вес" placeholder="1" content-after="кг" v-model.number="form.features.weight" name="weight" />
            <UiInput label="Цена" placeholder="2000" content-after="₽" v-model.number="form.features.price" name="price-features" />
          </div>
        </div>
        <div>
          <h4 class="font-semibold mb-2">Высота:</h4>
          <div class="grid grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-x-2">
            <UiInput label="Мин" placeholder="1" v-model.number="form.features.height.min" content-after="см" name="height-min" />
            <UiInput label="Макс" placeholder="1" v-model.number="form.features.height.max" content-after="см" name="height-max" />
          </div>
        </div>
      </div>
      <Editor v-model="form.description" name="description" />
      <div class="flex items-center">
        <div class="flex mr-auto">
          <UiSwitch v-model="form.isPublished" />
        </div>
        <div class="flex justify-end">
          <button class="px-4 py-2 bg-blue-600 text-slate-100 rounded-lg" type="submit">Сохранить</button>
        </div>
      </div>
    </form>
  </Container>
</template>
~/api/post
