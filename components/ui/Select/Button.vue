<script lang="ts" setup>
defineProps<{
  value: string
}>()
</script>
<template>
  <HListboxButton
    class="relative border w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
  >
    <span class="block truncate">{{ value }}</span>
    <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
      <Icon name="heroicons:chevron-up-down" class="h-5 w-5 text-gray-400" aria-hidden="true" />
    </span>
  </HListboxButton>
</template>
