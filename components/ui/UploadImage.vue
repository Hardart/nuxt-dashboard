<script setup lang="ts">
const onChange = async (e: Event) => {
  const files = (e.target as HTMLInputElement).files
  if (!files) return
  const file = files[0]
}
</script>

<template>
  <div>
    <input type="file" @change="onChange" />
  </div>
</template>

<style></style>
