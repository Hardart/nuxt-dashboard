<script setup lang="ts">
const props = defineProps<{
  selected: any
  data: any[]
}>()
</script>

<template>
  <TransitionExpand>
    <HListboxOptions
      class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
    >
      <HListboxOption as="template" v-for="item in data" :key="item.id" :value="item" v-slot="{ active, selected }">
        <li :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pr-9']">
          <div class="flex items-center">
            <!-- <img :src="item.avatar" alt="" class="h-5 w-5 flex-shrink-0 rounded-full" /> -->
            <span :class="[selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate']">{{ item.title }}</span>
          </div>

          <span v-if="selected" :class="[active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 right-0 flex items-center pr-2']">
            <Icon name="heroicons:check" class="h-4 w-4" aria-hidden="true" />
          </span>
        </li>
      </HListboxOption>
    </HListboxOptions>
  </TransitionExpand>
</template>
