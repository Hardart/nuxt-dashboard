<script setup lang="ts">
import apiPost from '@api/post'
const { categoriesMeta } = useCategories()
const categories = await categoriesMeta()
interface IFormProduct extends IProduct {
  categoryId: string
}
const props = defineProps<{
  product?: IProduct
}>()
const product = props.product
function setForm() {
  let formTemplate = reactive({
    title: '',
    categoryId: '',
    subtitle: '',
    slug: '',
    price: '',
    description: '',
    type: '',
    image: '',
    features: {
      class: '',
      price: '',
      weight: '',
      height: {
        min: '',
        max: '',
      },
    },
  }) satisfies IFormProduct
  if (product && product.category.id) {
    formTemplate = { ...product, categoryId: product.category.id }
  }
  return formTemplate
}
const form = setForm()

const productTypes = [
  { id: 'OKS', title: 'ОКС' },
  { id: 'ZKS', title: 'ЗКС' },
]

const onSubmit = async () => {
  const requiredFields = ['title', 'slug', 'categoryId'] as const
  removeEmptyKeys(form)
  console.log(form)

  const res = await apiPost.updateProductMutation(form)
  console.log(res)
}
</script>
<template>
  <Container class="py-7">
    <form class="space-y-10">
      <div class="grid grid-cols-3 max-md:grid-cols-1 max-md:space-y-3 gap-x-5">
        <UiInput is-requried label="Название" placeholder="Берёза повислая" v-model="form.title" />
        <UiInput label="Подназвание" placeholder="Двухгодовалая" v-model="form.subtitle" />
        <UiInput is-requried label="Slug" placeholder="bereza-povislaya" v-model="form.slug" />
      </div>
      <div class="flex gap-x-2">
        <UiNSelect class="flex-1 self-end" label="Категория" is-requried :options="categories" v-model="form.categoryId" />
        <UiNSelect class="flex-1" :options="productTypes" label="Тип" v-model="form.type" />
        <UiInput class="flex-[3]" label="Цена" placeholder="100" v-model="form.price" content-after="₽" />
      </div>
      <div class="grid md:grid-cols-2 md:gap-x-6 max-md:gap-y-5">
        <div>
          <h4 class="font-semibold mb-2">Особенности:</h4>
          <div class="grid grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-x-2">
            <UiInput label="Класс" placeholder="1" v-model="form.features.class" />
            <UiInput label="Вес" placeholder="1" content-after="кг" v-model="form.features.weight" />
            <UiInput label="Цена" placeholder="2000" content-after="₽" v-model="form.features.price" />
          </div>
        </div>
        <div>
          <h4 class="font-semibold mb-2">Высота:</h4>
          <div class="grid grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-x-2">
            <UiInput label="Мин" placeholder="1" v-model="form.features.height.min" content-after="см" />
            <UiInput label="Макс" placeholder="1" v-model="form.features.height.max" content-after="см" />
          </div>
        </div>
      </div>
      <Editor v-model="form.description" :text="form.description" />
      <div class="flex justify-end">
        <button @click="onSubmit" class="px-4 py-2 bg-blue-600 text-slate-100 rounded-lg" type="button">Сохранить</button>
      </div>
    </form>
  </Container>
</template>
