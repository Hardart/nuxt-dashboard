<script lang="ts" setup>
const { sidebar } = await useMeta()
</script>

<template>
  <aside class="hidden md:block justify-start py-7 px-4">
    <SidebarItem :items="sidebar" />
  </aside>
</template>

<style scoped></style>
