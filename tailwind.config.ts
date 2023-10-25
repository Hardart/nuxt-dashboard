import type { Config } from 'tailwindcss'
// import { iconsPlugin, getIconCollections } from '@egoist/tailwindcss-icons'
module.exports = {
  content: ['./pages/**/*.vue', './components/**/*.vue', './app.vue', './features/**/*.ts'],
  theme: {
    extend: {
      height: {
        header: 'var(--header-height)',
        sidebar: 'calc(100vh - var(--header-height))',
      },
    },
  },
  safelist: ['bg-red-500', 'text-right', 'lg:text-4xl'],
} satisfies Config
