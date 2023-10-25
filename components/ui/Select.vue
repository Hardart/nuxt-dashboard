<template>
  <HListbox as="div" :model-velue="modelValue" @update:model-value="$emit('update:modelValue', $event.target.value)" class="w-full">
    <HListboxLabel class="block text-sm font-medium leading-6 text-gray-900">{{ label }}</HListboxLabel>
    <div class="relative mt-0.5">
      <HListboxButton
        class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
      >
        <span class="flex items-center">
          <!-- <img :src="selected.avatar" alt="" class="h-5 w-5 flex-shrink-0 rounded-full" /> -->
          <span class="block truncate">{{ selected.title }}</span>
        </span>
        <span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
          <Icon name="heroicons:chevron-up-down" class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </HListboxButton>
      <TransitionExpand>
        <HListboxOptions
          class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          <HListboxOption as="template" v-for="item in options" :key="item.title" :value="item" v-slot="{ active, selected }">
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
    </div>
  </HListbox>
</template>

<script setup lang="ts">
const props = defineProps<{
  options: any[]
  label: string
  modelValue: string
}>()
defineEmits(['update:modelValue'])
console.log(props.options)

const selected = computed(() => props.options.find(el => el.title == props.modelValue))
console.log(selected)
</script>
