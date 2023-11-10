<script setup lang="ts">
defineProps<{
  option: any
}>()
</script>
<template>
  <HListboxOption v-slot="{ active, selected }" :key="option.title" :value="option.id" as="template">
    <li :class="[active ? 'bg-amber-100 text-amber-900' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-7 pr-4']">
      <span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">{{ option.title }}</span>
      <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-2 text-emerald-700">
        <Icon name="heroicons:check" size="14" aria-hidden="true" />
      </span>
    </li>
  </HListboxOption>
</template>
