<script lang="ts" setup>
function createItem() {
  return {
    fullName: chooseRandomName().fullName,
    email: randomEmail(),
    description: randomWord(1000, true),
    phone: randomPhoneNumber(),
  }
}

const items = Array(10).fill('').map(createItem)
</script>

<template>
  <main class="lg:px-6 relative h-full">
    <div class="flex flex-col h-full">
      <div class="relative w-56 h-56 bg-yellow-200 overflow-hidden">
        <div class="absolute w-full h-full">
          <img src="/img.webp" class="" alt="" />
        </div>
      </div>
      <UiUploadImage />
    </div>
  </main>
</template>

<style scoped></style>
