import { fileURLToPath } from 'url'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  modules: [
    '@vueuse/nuxt',
    'nuxt-icon',
    'nuxt-headlessui',
    '@morev/vue-transitions/nuxt',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
  ],
  headlessui: { prefix: 'H' },

  alias: {
    '@api': fileURLToPath(new URL('./api/', import.meta.url)),
  },
})
