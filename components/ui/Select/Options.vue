<script setup lang="ts">
defineProps<{
  options: any[]
}>()
</script>
<template>
  <HListboxOptions
    class="z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
  >
    <UiSelectOption :option="option" v-for="option in options" />
  </HListboxOptions>
</template>
