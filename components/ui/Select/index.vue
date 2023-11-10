<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    label?: string
    options: any[]
    modelValue: any
    isRequried?: boolean
    name?: string
    isEmptyValue?: boolean
  }>(),
  {
    isEmptyValue: true,
  }
)

defineEmits(['update:model-value'])
const options = props.isEmptyValue ? [{ id: '', title: '–' }, ...props.options] : props.options
const defaultValue = computed(() => {
  return options.find(opn => opn.id == props.modelValue)?.title || options[0].title
})
</script>
<template>
  <div>
    <HListbox :model-value="modelValue" :name="name" @update:modelValue="value => $emit('update:model-value', value)">
      <HListboxLabel
        class="block text-sm font-medium leading-6 text-gray-900 after:ml-0.5 after:text-red-500"
        :class="isRequried && `after:content-['*']`"
        >{{ label }}</HListboxLabel
      >
      <div class="relative">
        <UiSelectButton :value="defaultValue" />

        <TransitionExpand :duration="200">
          <UiSelectOptions :options="options" />
        </TransitionExpand>
      </div>
    </HListbox>
  </div>
</template>
