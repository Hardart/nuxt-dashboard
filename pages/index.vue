<script lang="ts" setup>
function createItem() {
  return {
    title: chooseRandomName().fullName,
    email: randomEmail(),
    description: randomWord(1000, true),
    phone: randomPhoneNumber(),
  }
}

const items = Array(10)
  .fill('')
  .map(v => createItem())
console.log(items)
</script>

<template>
  <main class="lg:px-6 relative h-full">
    <div class="flex flex-col h-full"></div>
  </main>
</template>

<style scoped></style>
