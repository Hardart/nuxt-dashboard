import { fileURLToPath } from 'url'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  modules: ['@vueuse/nuxt', 'nuxt-icon', '@nuxtjs/apollo', 'nuxt-headlessui', '@morev/vue-transitions/nuxt', '@nuxtjs/tailwindcss'],
  headlessui: { prefix: 'H' },
  apollo: {
    clients: {
      default: {
        inMemoryCacheOptions: { addTypename: false },
        httpEndpoint: 'http://localhost:4000',
      },
    },
  },
  alias: {
    '@api': fileURLToPath(new URL('./graphql/api/', import.meta.url)),
  },
})
