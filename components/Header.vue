<script lang="ts" setup>
const mode = useColorMode()
const toggleThemeColorMode = () => {
  mode.value = mode.value === 'light' ? 'dark' : 'light'
}
</script>

<template>
  <header>
    <div class="h-header flex items-center justify-between px-5 box-content">
      <div class="logo">
        <img src="/logo.svg" alt="" />
      </div>

      <button
        class="grid place-content-center rounded-full ml-5 p-2"
        @click="toggleThemeColorMode"
        :class="[mode === 'light' ? 'bg-orange-400' : 'bg-orange-200']"
      >
        <Icon
          :name="`heroicons:${mode === 'light' ? 'sun-solid' : 'sun'}`"
          class="h-6 w-6 transition-colors duration-300"
          :class="[mode === 'light' ? 'text-white' : 'text-zinc-700']"
        />
      </button>
    </div>
  </header>
</template>

<style scoped></style>
