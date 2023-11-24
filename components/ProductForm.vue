<script setup lang="ts">
import type { IProductForm } from '~/types/settings'
const { categories, types } = useState<IProductForm>('productForm').value

defineProps<{
  product: ProductModel
  isPending?: boolean
}>()

defineEmits(['submit'])
const goBack = useRouter().back
</script>

<template>
  <Container class="py-7">
    <form class="space-y-10" @submit.prevent="$emit('submit', product)" ref="itemFormData">
      <div class="grid grid-cols-3 max-md:grid-cols-1 max-md:space-y-3 gap-x-5">
        <UiInput is-requried label="Название" placeholder="Берёза повислая" v-model="product.title" name="title" />
        <UiInput label="Подназвание" placeholder="Двухгодовалая" v-model="product.subtitle" name="subtitle" />
        <UiInput is-requried label="Slug" placeholder="bereza-povislaya" v-model="product.slug" name="slug" />
      </div>
      <div class="flex gap-x-2">
        <UiSelect v-if="categories" class="flex-1" :options="categories" label="Категория" v-model="product.categoryId" />
        <UiSelect class="flex-1" :options="types" label="Тип" name="type" v-model="product.type" />
        <UiInput class="flex-[3]" label="Цена" placeholder="100" v-model.number="product.price" content-after="₽" name="price" />
      </div>
      <div class="grid md:grid-cols-2 md:gap-x-6 max-md:gap-y-5">
        <div>
          <h4 class="font-semibold mb-2">Особенности:</h4>
          <div class="grid grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-x-2">
            <UiInput label="Класс" placeholder="1" v-model.number="product.features.class" name="class" />
            <UiInput label="Вес" placeholder="1" content-after="кг" v-model.number="product.features.weight" name="weight" />
            <UiInput label="Цена" placeholder="2000" content-after="₽" v-model.number="product.features.price" name="price-features" />
          </div>
        </div>
        <div>
          <h4 class="font-semibold mb-2">Высота:</h4>
          <div class="grid grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-x-2">
            <UiInput label="Мин" placeholder="1" v-model.number="product.features.height.min" content-after="см" name="height-min" />
            <UiInput label="Макс" placeholder="1" v-model.number="product.features.height.max" content-after="см" name="height-max" />
          </div>
        </div>
      </div>
      <Editor v-model="product.description" name="description" />
      <div class="flex items-center">
        <div class="flex mr-auto">
          <UiSwitch v-model="product.isPublished" />
        </div>
        <div class="flex justify-end space-x-2">
          <button @click="goBack" class="px-4 py-2 bg-red-500 text-slate-100 rounded-lg" type="button">Назад</button>
          <button class="px-4 py-2 bg-blue-600 text-slate-100 rounded-lg disabled:bg-neutral-400" :disabled="isPending" type="submit">
            Сохранить
          </button>
        </div>
      </div>
    </form>
  </Container>
</template>
