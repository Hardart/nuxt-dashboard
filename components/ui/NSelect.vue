<script setup lang="ts">
const props = defineProps<{
  label?: string
  options: any[]
  modelValue: any
  isRequried?: boolean
}>()
defineEmits(['update:model-value'])
const optionLabel = computed(() => {
  return props.options.find(opn => opn.id == props.modelValue)?.title || '-'
})
</script>
<template>
  <div>
    <HListbox :model-value="modelValue" @update:modelValue="value => $emit('update:model-value', value)">
      <HListboxLabel
        class="block text-sm font-medium leading-6 text-gray-900 after:ml-0.5 after:text-red-500"
        :class="isRequried && `after:content-['*']`"
        >{{ label }}</HListboxLabel
      >
      <div class="relative mt-0.5">
        <HListboxButton
          class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
        >
          <span class="block truncate">{{ optionLabel }}</span>
          <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <Icon name="heroicons:chevron-up-down" class="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </HListboxButton>

        <TransitionExpand :duration="200">
          <HListboxOptions
            class="z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            <HListboxOption v-slot="{ active, selected }" v-for="option in options" :key="option.title" :value="option.id" as="template">
              <li :class="[active ? 'bg-amber-100 text-amber-900' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-10 pr-4']">
                <span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">{{ option.title }}</span>
                <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                  <Icon name="heroicons:check" class="h-4 w-4" aria-hidden="true" />
                </span>
              </li>
            </HListboxOption>
          </HListboxOptions>
        </TransitionExpand>
      </div>
    </HListbox>
  </div>
</template>
