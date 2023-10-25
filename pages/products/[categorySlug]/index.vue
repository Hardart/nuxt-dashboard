<script setup lang="ts">
const { categorySlug } = useRoute().params
if (typeof categorySlug === 'object') throw createError('slug param is not a STRING')

const { categoryBySlug } = useCategories()

const category = await categoryBySlug(categorySlug)
if (typeof category === 'undefined') throw createError('category with slug ... is not defined')
</script>
<template>
  <div class="p-5">
    <div class="mb-20 flex items-center justify-between">
      <h3 class="text-3xl font-semibold">Категория - {{ category.title }}</h3>
      <NuxtLink to="/products/categories/add" class="p-3 text-3xl text-white bg-green-700 flex rounded-full">
        <Icon name="heroicons:plus" />
      </NuxtLink>
    </div>
    <table class="w-full" v-if="category.products">
      <thead>
        <tr>
          <th class="border border-slate-600">N</th>
          <th class="border border-slate-600 w-full py-2">Название</th>
          <th class="border border-slate-600 px-3">Изменить</th>
          <th class="border border-slate-600 px-3">Удалить</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in category.products">
          <td class="border border-slate-700 px-3 py-2 text-sm">{{ index + 1 }}</td>
          <td class="border border-slate-700 px-3 py-2 text-sm">
            <NuxtLink :to="product.link" class="underline">{{ product.title }}</NuxtLink>
          </td>
          <td class="border border-slate-700">
            <button class="p-[6px] text-white bg-sky-700 flex rounded-full mx-auto">
              <Icon name="heroicons:pencil-square" />
            </button>
          </td>
          <td class="border border-slate-700">
            <button class="p-[6px] text-white bg-red-600 flex rounded-full mx-auto">
              <Icon name="heroicons:trash" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
