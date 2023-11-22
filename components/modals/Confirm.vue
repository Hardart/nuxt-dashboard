<template>
  <!-- Wrap your dialog in a `TransitionRoot`. -->
  <HTransitionRoot :show="isOpen" as="template">
    <HDialog @close="toggleState" class="relative">
      <!-- Wrap your backdrop in a `TransitionChild`. -->
      <HTransitionChild
        class="fixed inset-0 backdrop-blur-sm backdrop-brightness-75"
        enter="duration-200 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
      </HTransitionChild>
      <!-- Wrap your panel in a `TransitionChild`. -->
      <HTransitionChild
        class="fixed inset-0 grid place-items-center"
        enter="duration-500 ease-out"
        enter-from="opacity-0 scale-150"
        enter-to="opacity-100 scale-100"
        leave="duration-300 ease-in-out"
        leave-from="opacity-100 scale-100"
        leave-to="opacity-0 scale-125"
      >
        <HDialogPanel class="bg-neutral-200 py-6 px-8 rounded-lg shadow-lg">
          <HDialogTitle>Подвердите действие</HDialogTitle>
          <div class="flex space-x-4 mt-4">
            <button class="py-2 px-3 rounded-lg bg-red-600 text-white w-full" @click="toggleState">Отменить</button>
            <button class="py-2 px-3 rounded-lg bg-blue-600 text-white w-full" @click="accept">Применить</button>
          </div>
        </HDialogPanel>
      </HTransitionChild>
    </HDialog>
  </HTransitionRoot>
</template>

<script setup lang="ts">
const props = defineProps<{
  confirmHandler: () => void
  toggleState: () => void
  isOpen: boolean
}>()

const accept = () => {
  props.confirmHandler()
  props.toggleState()
}
</script>
