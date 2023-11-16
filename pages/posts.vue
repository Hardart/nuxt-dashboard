<script lang="ts" setup>
import { usePostsStore } from '~/store/usePostsStore'
const { posts, getPaginationPages } = storeToRefs(usePostsStore())
const { loadPosts, loadPostsFromCache } = usePostsStore()
const { queryPage } = useQueryParams()
const page = ref(queryPage() || 1)

await loadPosts(page.value)
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
  <Pagination :total-pages="getPaginationPages" v-model="page" :load-handler="loadPostsFromCache" />
</template>
