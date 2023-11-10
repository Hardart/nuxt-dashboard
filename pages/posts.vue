<script lang="ts" setup>
import { usePostsStore } from '~/store/usePostsStore'
const { posts, totalPosts, getPaginationPages } = storeToRefs(usePostsStore())
const { loadPosts, loadPostsFromCache } = usePostsStore()
const page = ref(1)
loadPosts(page.value)
const loadNextPage = () => {
  page.value++
  if (page.value < 1) return
  loadPostsFromCache(page.value)
}
const loadPrevPage = () => {
  page.value--
  if (page.value < 1) return (page.value = 1)
  loadPostsFromCache(page.value)
}
const setPage = (pageNumber: number) => {
  page.value = pageNumber
  loadPostsFromCache(page.value)
}
</script>

<template>
  <ul>
    <li v-for="post in posts">
      <div class="flex space-x-3">
        <h3>{{ post.id }}.</h3>
        <h3 class="first-letter:uppercase">{{ post.title }}</h3>
      </div>
    </li>
  </ul>
  <Pagination :total="getPaginationPages" @set-page="setPage" />
  <button class="p-4 my-4 bg-emerald-600" @click="loadPrevPage">Prev Page</button>
  <button class="p-4 my-4 bg-emerald-600" @click="loadNextPage">Next Page</button>
</template>
