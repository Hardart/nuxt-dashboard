<script lang="ts" setup>
const { getSidebar } = useMeta()
const sidebar = await getSidebar()
</script>

<template>
  <aside class="hidden md:block justify-start py-7 px-4 max-lg:px-2">
    <SidebarItem :items="sidebar" />
  </aside>
</template>

<style scoped></style>
