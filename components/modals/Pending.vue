<template>
  <!-- Wrap your dialog in a `TransitionRoot`. -->
  <HTransitionRoot :show="isOpen" as="template">
    <HDialog class="relative">
      <!-- Wrap your backdrop in a `TransitionChild`. -->
      <div class="fixed grid place-content-center inset-0 backdrop-blur-sm backdrop-brightness-75">
        <!-- Wrap your panel in a `TransitionChild`. -->

        <HDialogPanel class="font-bold py-6 px-8 rounded-lg shadow-lg">
          <HDialogTitle>Loading....</HDialogTitle>
        </HDialogPanel>
      </div>
    </HDialog>
  </HTransitionRoot>
</template>

<script setup lang="ts">
defineProps<{
  isOpen: boolean
}>()
</script>
