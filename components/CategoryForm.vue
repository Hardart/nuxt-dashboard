<script setup lang="ts">
import { useCategoriesStore } from '~/store/useCategoriesStore'
import { useProductsStore } from '~/store/useProductsStore'
const props = defineProps<{
  category?: ICategory
}>()

const form: FormCategory = reactive(setForm(props.category))

function setForm(category?: ICategory) {
  let formTemplate: FormCategory = {
    title: '',
    slug: '',
    image: '',
    isPublished: false,
  }

  if (category) {
    const { slug, title, image, isPublished } = deepCloneObject<ICategory>(category)
    formTemplate = { slug, title, image, isPublished }
  }

  return formTemplate
}

const productTypes = [
  { id: 'OKS', title: 'ОКС' },
  { id: 'ZKS', title: 'ЗКС' },
]

const onSubmit = async () => {
  // removeEmptyKeys(form)
  const requiredFields = ['title', 'slug'] as const
  if (!requiredFields.every(key => key in form && form[key] !== '0')) throw createError('Some of required fields are empty')
  console.log(form)

  // const { status } = await createOrUpdate(form)
  // if (status == 'fail') throw createError('Some error on create or update product')
  // if (status == 'ok') await useRouter().push(`/catalog/products`)
}
</script>

<template>
  <Container class="py-7">
    <form class="space-y-10" @submit.prevent="onSubmit" ref="itemFormData">
      <div class="grid grid-cols-3 max-md:grid-cols-1 max-md:space-y-3 gap-x-5">
        <UiInput is-requried label="Название" placeholder="Берёза повислая" v-model="form.title" name="title" />
        <UiInput is-requried label="Slug" placeholder="bereza-povislaya" v-model="form.slug" name="slug" />
      </div>

      <div class="flex items-center">
        <div class="flex mr-auto">
          <UiSwitch v-model="form.isPublished" />
        </div>
        <div class="flex justify-end space-x-2">
          <NuxtLink to="/catalog/categories" class="px-4 py-2 bg-red-500 text-slate-100 rounded-lg" type="submit">Назад</NuxtLink>
          <button class="px-4 py-2 bg-blue-600 text-slate-100 rounded-lg" type="submit">Сохранить</button>
        </div>
      </div>
    </form>
  </Container>
</template>
~/api/post
