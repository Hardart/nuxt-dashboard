import apiGET from '@api/get'
interface IPost {
  id: number
  userId: number
  title: string
  body: string
}
interface IPostCache {
  [key: number]: IPost[] | null
}

export const usePostsStore = defineStore('posts', () => {
  // STATE
  const posts = ref<IPost[] | null>(null)
  const firstInit = ref(false)
  const postsFromPage = ref<IPostCache>({})
  const totalPosts = ref(0)
  const postsPerPage = 7

  // GETTERS
  const getPosts = () => posts.value
  const getPaginationPages = computed(() => Math.ceil(+totalPosts.value / postsPerPage))
  // ACTIONS
  async function loadPosts(page: number) {
    const { data } = await apiGET.testData<IPost[]>(totalPosts, page)
    postsFromPage.value[page] = data.value
    posts.value = data.value
  }

  async function loadPostsFromCache(page: number) {
    const cachedPosts = postsFromPage.value[page]
    if (cachedPosts) posts.value = cachedPosts
    else await loadPosts(page)
  }

  return {
    posts,
    postsFromPage,
    totalPosts,
    getPaginationPages,
    getPosts,
    loadPosts,
    loadPostsFromCache,
  }
})
