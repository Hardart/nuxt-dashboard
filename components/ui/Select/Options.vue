<script setup lang="ts">
withDefaults(
  defineProps<{
    options: any[]
    positon: 'top' | 'bottom'
  }>(),
  {
    positon: 'bottom',
  }
)
</script>
<template>
  <HListboxOptions
    class="z-10 absolute max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
    :class="positon === 'bottom' ? 'mt-1' : 'bottom-full mb-1'"
  >
    <UiSelectOption :option="option" v-for="option in options" />
  </HListboxOptions>
</template>
