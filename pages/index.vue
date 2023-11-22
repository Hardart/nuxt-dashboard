<script lang="ts" setup>
function createItem() {
  return {
    fullName: chooseRandomName().fullName,
    email: randomEmail(),
    description: randomWord(1000, true),
    phone: randomPhoneNumber(),
  }
}

const items = Array(10)
  .fill('')
  .map(v => createItem())
</script>

<template>
  <main class="lg:px-6 relative h-full">
    <div class="flex flex-col h-full">
      <div v-for="item in items">{{ item.fullName }} - {{ item.email }}</div>
    </div>
  </main>
</template>

<style scoped></style>
